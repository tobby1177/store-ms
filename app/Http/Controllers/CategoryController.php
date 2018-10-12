<?php

namespace App\Http\Controllers;

use App\Category;

class CategoryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return response()->json(Category::all());
    }
}
