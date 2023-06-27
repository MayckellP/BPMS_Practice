<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\ClaimOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class ClaimOrderController extends Controller
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
            'title' => 'required',
            'content' => 'required',
            'solution' => 'required',
        ]);

        //$request->Order()->claims()->create($validated);

        $request = ClaimOrder::create($validated);
        return to_route('orders.index');
    }
}
