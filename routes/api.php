<?php

Route::resource('/items', 'ItemController')->only(['index', 'show']);

Route::post('/login','AuthController@login')->name('login');  
Route::post('/register','AuthController@register');

// Route::post('/password/email','Auth\ForgotPasswordController@sendResetLinkEmail'); 
// Route::post('/password/reset','Auth\ResetPasswordController@reset');

Route::group(['middleware' => 'auth:api'], function ()
{
	Route::get('/login/verify', 'AuthController@verify');
	Route::post('/logout', 'AuthController@logout');

	Route::get('/user', 'UserController@show');
	Route::resource('/cart', 'CartController');
	Route::resource('/orders', 'OrderController')->only('index', 'store');
});
