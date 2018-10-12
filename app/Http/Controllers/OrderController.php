<?php

namespace App\Http\Controllers;

use App\Order;
use App\User;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;

class OrderController extends Controller
{
	private $user_id; // The user ID for an order

	public function __construct(Request $request)
	{
		$this->user_id = $request->id;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @param \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);

		$orders = Order::where('user_id', $token->user_id)->latest()->get();
	
		return response()->json(['orders' => $orders]);
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
		$token_id = (new Parser())->parse($request->bearerToken())->getHeader('jti');
		$token = $request->user()->tokens->find($token_id);
		$user = User::find($token->user_id);

		$cart = $user->cart ? $user->cart : '[]';
		$cart = json_decode($cart, true);

		foreach ($cart as $key => $value) {
			$order = new Order;
			$order->user_id = $user->id;
			$order->item_id = $value['item'];
			$order->quantity = $value['quantity'];
			$order->save();
		}

		$user->cart = NULL;
		$user->save();
		
		$orders = Order::where('user_id', $user->id)->latest()->get();
		
		return response()->json(['orders' => $orders]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Order  $order
	 * @return \Illuminate\Http\Response
	 */
	public function show(Order $order)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Order  $order
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Order $order)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Order  $order
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Order $order)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Order  $order
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Order $order)
	{
		//
	}
}
