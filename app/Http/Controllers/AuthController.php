<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth; 
use Validator;
use Illuminate\Support\Facades\Route;
use Cookie;
use Laravel\Passport\Client;
use Lcobucci\JWT\Parser;

class AuthController extends Controller
{
	/** 
	 * Login user API 
	 * 
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response 
	 */ 
	public function login(Request $request)
	{
		$credentials = $request->only('email', 'password');
		$client = Client::where('password_client', 1)->first();
		$request->request->add([
			'grant_type' => 'password',
			'client_id' => $client->id,
			'client_secret' => $client->secret,
			'username' => $request->email,
			'password' => $request->password,
			'scope' => '*'
		]);
		$tokenRequest = Request::create('/oauth/token', 'post');
		$dispatch = Route::dispatch($tokenRequest);
		$response = json_decode($dispatch->getContent());
		if ($dispatch->getStatusCode() == 200) {
			return response()->json([
				'login' => User::where('email', $request->email)->first()->name
			])
			->cookie('access_token', $response->access_token, env('ACCESS_TOKEN_EXPIRE'), null, null, false, false)
			->cookie('refresh_token', $response->refresh_token, env('REFRESH_TOKEN_EXPIRE'), null, null, false, true);
		} else {
			return response()->json(['error' => 'Incorrect login credentials.'], 401);			
		}
	}

	/**
	 * Verify user login
	 * 
	 * @return \Illuminate\Http\Response
	 */
	public function verify(Request $request)
	{
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);
		return response()->json(['login' => User::find($token->user_id)->name]);
	}

	/**
	 * Log out user
	 * 
	 * @param \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function logout(Request $request)
	{
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);
		$token->revoke();
		return response()->json([
			'login' => null
		])
		->withCookie(Cookie::forget('access_token'))
		->withCookie(Cookie::forget('refresh_token'));
	}

	/**
	 * Create a new user
	 * 
	 * @param \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function register(Request $request)
	{
		$credentials = $request->only('name', 'email', 'password');
		$validator = Validator::make($credentials, [
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6'
		]);
		if ($validator->fails()) {
			return response()->json(['error' => $validator->errors()], 422);
		}
		User::create([
			'name' => $credentials['name'],
			'email' => $credentials['email'],
			'password' => bcrypt($credentials['password'])
		]);
		$client = Client::where('password_client', 1)->first();
		$request->request->add([
			'grant_type' => 'password',
			'client_id' => $client->id,
			'client_secret' => $client->secret,
			'username' => $credentials['email'],
			'password' => $credentials['password'],
			'scope' => '*'
		]);
		$tokenRequest = Request::create('/oauth/token', 'post');
		$dispatch = Route::dispatch($tokenRequest);
		$response = json_decode($dispatch->getContent());
		return response()->json([
			'login' => User::where('email', $request->email)->first()->name
		])
		->cookie('access_token', $response->access_token, env('ACCESS_TOKEN_EXPIRE'), null, null, false, false)
		->cookie('refresh_token', $response->refresh_token, env('REFRESH_TOKEN_EXPIRE'), null, null, false, true);
	}
}
