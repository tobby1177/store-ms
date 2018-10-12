<?php

namespace App\Http\Controllers;

use App\Item;
use App\User;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;

class CartController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @param \Illuminate\http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);
		$user = User::find($token->user_id);
		if ( $user->cart ) {
			$cart = json_decode($user->cart, true);
			foreach ($cart as $key => $value) {
				$cart[$key] = json_decode(Item::find($value['item']), true);
				$cart[$key]['quantity'] = $value['quantity'];
			}
		} else {
			$cart = [];
		}
		return response()->json(['cart' => $cart]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);
		$user = User::find($token->user_id);

		$initial_cart = $user->cart ? $user->cart : '[]';
		$initial_cart = json_decode($initial_cart, true);

		$item = [[
			"item" => $request->item_id,
			"quantity" => (int) $request->quantity
		]];
		
		$cart = array_merge($item, $initial_cart);

		$user->cart = json_encode($cart);
		$user->save();

		return response()->json(['cart' => json_decode($user->cart, true)]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Item  $item
	 * @return \Illuminate\Http\Response
	 */
	public function show(Item $item)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Item  $item
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Item $item)
	{
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);
		$user = User::find($token->user_id);

		$cart = $user->cart ? $user->cart : '[]';
		$cart = json_decode($cart, true);

		foreach ($cart as $key => $value) {
			if ( $cart[$key]['item'] == $request->item_id ) {
				$cart[$key]['quantity'] = (int) $request->quantity;
				break;
			}
		}

		$user->cart = json_encode($cart);
		$user->save();

		return response()->json(['cart' => json_decode($user->cart, true)]);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \Illuminate\Http\Request  $request
	 * @param  \App\Item  $item
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Request $request, Item $item)
	{
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);
		$user = User::find($token->user_id);

		$cart = $user->cart ? $user->cart : '[]';
		$cart = json_decode($cart, true);

		foreach ($cart as $key => $value) {
			if ( $cart[$key]['item'] == $request->item_id ) {
				unset($cart[$key]);
				$cart = array_values($cart);
				break;
			}
		}

		$user->cart = json_encode($cart);
		$user->save();

		return response()->json(['cart' => json_decode($user->cart, true)]);
	}
}
