<?php
namespace App\Widgets\Admin;

use App\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Widgets\BaseDimmer;

class OrderDimmer extends BaseDimmer
{
    /**
     * The configuration array.
     *
     * @var array
     */
    protected $config = [];
    /**
     * Treat this method as a controller action.
     * Return view() or other content to display.
     */
    public function run()
    {
		  $count = Order::count();
        $string = $count <= 1 ? 'order': 'orders';
        return view('voyager::dimmer', array_merge($this->config, [
            'icon'   => 'voyager-bag',
            'title'  => $count." ".ucfirst($string),
				'text'	=> "You have {$count} {$string} in your database. Click on button below to view all {$string}.",
            'button' => [
                'text' => "View {$string}",
                'link' => route('voyager.orders.index'),
            ],
            'image' => '/storage/widgets/orders.jpg',
        ]));
    }
    /**
     * Determine if the widget should be displayed.
     *
     * @return bool
     */
    public function shouldBeDisplayed()
    {
        return Auth::user()->can('browse', Voyager::model('User'));
    }
}