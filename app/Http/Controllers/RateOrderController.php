<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\RateOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class RateOrderController extends Controller
{

    public function index()
    {
        //
    }

  
    public function create()
    {
        //
    }

 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required',
            'rating' => 'required',
        ]);

        $request->Order()->rating()->create($validated);
        //$request = RateOrder::create($validated);
        return to_route('orders.index');
    }
}