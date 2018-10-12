<?php

namespace App;

use App\Item;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
	protected $appends = ['item'];
	protected $hidden = ['id', 'item_id', 'updated_at', 'user_id'];

	public function getItemAttribute() {
		return Item::find($this->item_id);
	}
}
