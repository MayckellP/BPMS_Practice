<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Client;
use App\Models\OrderDetail;
use App\Models\CartStore;
use App\Models\Stock;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;


class CartStoreController extends Controller
{
    /* function __construct()
    {
        $this->middleware('permission:ver-CartOrder|crear-CartOrder|editar-CartOrder|borrar-CartOrder', ['only'=>['index']]);
        $this->middleware('permission:crear-CartOrder', ['only'=>['create', 'store']]);
        $this->middleware('permission:editar-CartOrder', ['only'=>['edit', 'update']]);
        $this->middleware('permission:borrar-CartOrder', ['only'=>['destroy']]);
    } */

    public function index(Request $request)
    {
        //ID FOR THE USER
        $userId = Auth::id();
        $myCarts = CartStore::where('user_id', $userId)->get();

        foreach ($myCarts as $myCart) {
            $newOrder = new Order();
            $orderDetail = new OrderDetail();

            if($myCart->auxiliar_user === null){
                $newOrder->user_id = $myCart->user_id;
            } else {
                $newOrder->user_id = $myCart->auxiliar_user;
            }
            $newOrder->model = $myCart->model;
            $newOrder->category = $myCart->category;
            $newOrder->quantity = $myCart->quantity; 
            $newOrder->color = $myCart->color;
            $newOrder->image = $myCart->image; 

            $newOrder->save();


            $orderDetail->order_id = $newOrder->id;

            $orderDetail->save(); 
        }

        $myCarts = CartStore::where('user_id', $userId)->delete();
        
        return to_route('cartUpdate');
    }


    public function create()
    {
        //ID FOR THE USER
        $userId = Auth::id();

        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myCart = CartStore::where('user_id', $userId)->get();

        //CALL STOCK DATABASE
        $stockProduct = Stock::whereIn(DB::raw('(id, model)'), function ($query) {
            $query->select(DB::raw('MIN(id), model'))
                ->from('stocks')
                ->groupBy('model');
        })->get();
        $stockColor = Stock::all();
        $clients = Client::all();

        return Inertia::render('Store/Crear', compact('myCart', 'stockProduct', 'stockColor', 'clients'));
    }

    public function store(Request $request)
    {
            $validated = $request->validate([
                'model' => 'required',
                'category' => 'required',
                'quantity' => 'required',
                'color' => 'required',
                'image' => 'required',
            ]);
    
            $newOrder = $request->user()->cartOrders()->create($validated);
            $newOrder->auxiliar_user = $request->auxiliar_user;
            $newOrder->save();
            return to_route('cartUpdate');
        
    }

    public function addToOrder()
    {
        
    }

    public function edit(Order $order)
    {
        return Inertia::render('Store/Editar', compact('order'));
    }


    public function update(Request $request, Order $order)
    {
       /*  $validated = $request->validate([
            'model' => 'required',
            'category' => 'required',
            'quantity' => 'required',
            'color' => 'required',
            'image' => 'required'
        ]);
        $order->update($validated);

        return to_route('store.index'); */

    }


    public function destroy($id)
    {
        DB::table('cart_stores')->where('id', $id)->delete();
        return to_route('cartUpdate');
    }
}
