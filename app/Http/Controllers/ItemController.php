<?php

namespace App\Http\Controllers;

use App\User;
use App\Item;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;
use DB;

class ItemController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$hiddenParams = explode(',', $request->query('hidden'));
		$response = Item::orderBy('id', 'desc')->where('availability', 1)->get();
		$response->makeHidden($hiddenParams);
		return response()->json($response);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \Illuminate\Http\Request  $request
	 * @param  \App\Item  $item
	 * @return \Illuminate\Http\Response
	 */
   public function show(Request $request, Item $item)
   {
		$response = Item::find($item->id);
		$response->makeHidden(['id']);
		if ( $request->cookie('access_token') && $request->cookie('refresh_token') ) {
			$token_id = (new Parser())->parse($request->cookie('access_token'))->getHeader('jti');
			$token = DB::table('oauth_access_tokens')->where('id', $token_id)->first();
			if ($token) {
				$user = User::find($token->user_id);
				if ( $user->cart ) {
					$cart = json_decode($user->cart, true);
					$existing_item_key = null;
					foreach ($cart as $key => $value) {
						if ( $cart[$key]['item'] == $item->id ) {
							$quantity = $cart[$key]['quantity'];
							$in_cart = true;
							break;
						}
					}
				} else {
					$cart = [];
				}
			}
		}
		$quantity = @$quantity ? $quantity : 1;
		$in_cart = @$in_cart ? $in_cart : false;
		return response()->json(['item' => $response, 'quantity' => $quantity, 'in_cart' => $in_cart ]);
   }

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Item  $item
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Item $item)
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
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Item  $item
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Item $item)
	{
		//
	}
}
