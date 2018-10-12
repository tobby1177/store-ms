<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Category;

class Item extends Model
{
	protected $appends = ['category'];
	protected $hidden = ['availability', 'category_id', 'created_at', 'updated_at'];

	public function getCategoryAttribute() {
		return Category::find($this->category_id)->name;
	}
}
