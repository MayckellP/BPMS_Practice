<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\User;
use App\Models\Stock;
use App\Models\ClaimOrder;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

//EVENT TO PUSHER
use App\Events\TrackMessage;
use Pusher\Pusher;


class OrderController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:show-order|create-order|edit-order|delete-order', ['only'=>['index']]);
        $this->middleware('permission:show-order', ['only'=>['create', 'store']]);
        $this->middleware('permission:edit-order', ['only'=>['edit', 'update']]);
        $this->middleware('permission:delete-order', ['only'=>['destroy']]);
    }

    public function index(Request $request)
    {
        //ID FOR THE USER
        $userId = Auth::id();

        //COMMAND TO SHOW GRAPHIC
        $filterChart = DB::table('orders')
        ->select('model', 'color', DB::raw('SUM(quantity) as total_cantidad'))
        ->groupBy('model', 'color')
        ->where('user_id', $userId)
        ->orderBy('total_cantidad', 'DESC')
        ->limit(3)->get();

        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myOrders = Order::where('user_id', $userId)->get();

        //SHOW CLAIMORDERS
        $myClaims = ClaimOrder::with('Order.user')->whereHas('Order.user')->get();

        return Inertia::render('Orders/Index', 
        [
            'filterChart' => $filterChart,
            'myOrders' => $myOrders,
            'myClaims' => $myClaims
        ]);

    }

    public function show($identifier)
    {
        $orderDetailID = $identifier;
        $user_id = Auth::id();
        $myOrders = Order::where('user_id', $user_id)->get();

        $completeTable = DB::table('orders')->where('user_id', $user_id)
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed', 
        'order_details.date_to_produce', 
        'order_details.date_to_deliver', 
        'order_details.sent_to', 
        'order_details.receiver',
        'foto_1', 'foto_2')->get();

        if($identifier === "register"){
            return Inertia::render('Orders/Register', ['myOrders' => $myOrders, 'completeTable' => $completeTable]);
        } else{
            return Inertia::render('Orders/RegisterDetail', 
            ['myOrders' => $myOrders,
             'completeTable' => $completeTable, 
             'orderDetailID' => $orderDetailID]);
        }
        
    }

    public function create()
    {
        $identifierURL = "QuickPurchase";
        $stock = Stock::all();
        $filterStock = Stock::distinct()->pluck('model');
        return Inertia::render('Orders/Crear', compact('stock', 'filterStock', 'identifierURL'));
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'model' => 'required',
            'category' => 'required',
            'quantity' => 'required',
            'color' => 'required',
            'image' => 'required'
        ]);

        $showID = $request->user()->orders()->create($validated);

        
        $orderDetail = new OrderDetail();

        $orderDetail->order_id = $showID->id;;
        $orderDetail->created_at = $showID->created_at;

        $orderDetail->save(); 

        $confirmedCount = OrderDetail::where('confirmed', null)->count();
        $date_to_produceCount = OrderDetail::where('date_to_produce', null)->count();
        $date_to_deliverCount = OrderDetail::where('date_to_deliver', null)->count();
        $deliveredCount = OrderDetail::where('sent_to', null)->count();

        //PUSHER 
        event(new TrackMessage($orderDetail->created_at, $confirmedCount, $date_to_produceCount, $date_to_deliverCount, $deliveredCount));


        return to_route('orders.index');
    }


    public function edit(Order $order)
    {
        return Inertia::render('Orders/Editar', compact('order'));
    }


    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'model' => 'required',
            'category' => 'required',
            'quantity' => 'required',
            'color' => 'required',
            'image' => 'required'
        ]);
        $order->update($validated);

        return to_route('orders.index');

    }


    public function destroy(Order $order)
    {
        $order->delete();
        return to_route('orders.index');
    }
}
