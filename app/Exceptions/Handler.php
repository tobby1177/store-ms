<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Laravel\Passport\Client;
use Lcobucci\JWT\Parser;
use App\User;
use DB;

class Handler extends ExceptionHandler
{
	/**
	 * A list of the exception types that are not reported.
	 *
	 * @var array
	 */
	protected $dontReport = [
		//
	];

	/**
	 * A list of the inputs that are never flashed for validation exceptions.
	 *
	 * @var array
	 */
	protected $dontFlash = [
		'password',
		'password_confirmation',
	];

	/**
	 * Report or log an exception.
	 *
	 * @param  \Exception  $exception
	 * @return void
	 */
	public function report(Exception $exception)
	{
		parent::report($exception);
	}

	/**
	 * Render an exception into an HTTP response.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Exception  $exception
	 * @return \Illuminate\Http\Response
	 */
	public function render($request, Exception $exception)
	{
		if (
			$exception instanceof \Illuminate\Auth\AuthenticationException &&
			$request->cookie('refresh_token')
		) {
			$client = Client::where('password_client', 1)->first();
			$request->request->add([
				'grant_type' => 'refresh_token',
				'refresh_token' => $request->cookie('refresh_token'),
				'client_id' => $client->id,
				'client_secret' => $client->secret,
				'scope' => '*',
			]);
			$tokenRequest = Request::create('/oauth/token', 'post');		
			$dispatch = Route::dispatch($tokenRequest);
			$response = json_decode($dispatch->getContent());
			$token_id = (new Parser())->parse($response->access_token)->getHeader('jti');
			$token = DB::table('oauth_access_tokens')->where('id', $token_id)->first();
			return response()->json([
				'login' => User::find($token->user_id)->name,
			])
			->cookie('access_token', $response->access_token, env('ACCESS_TOKEN_EXPIRE'), null, null, false, false)
			->cookie('refresh_token', $response->refresh_token, env('REFRESH_TOKEN_EXPIRE'), null, null, false, true);
		}
		return parent::render($request, $exception);
	}
}
