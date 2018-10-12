<?php
namespace App\Widgets\Admin;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Widgets\BaseDimmer;

class UserDimmer extends BaseDimmer
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
		  $count = User::count();
        $string = $count <= 1 ? 'user': 'users';
        return view('voyager::dimmer', array_merge($this->config, [
            'icon'   => 'voyager-basket',
            'title'  => $count." ".ucfirst($string),
			'text'	=> "You have {$count} {$string} in your database. Click on button below to view all {$string}.",
            'button' => [
                'text' => "View {$string}",
                'link' => route('voyager.users.index'),
            ],
            'image' => voyager_asset('images/widget-backgrounds/01.jpg'),
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