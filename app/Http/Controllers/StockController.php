<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\User;
use App\Models\ClaimOrder;
use App\Models\OrderDetail;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

//EVENT TO PUSHER
use App\Events\TrackMessage;
use Pusher\Pusher;

class StockController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:show-stock|create-stock|edit-stock|delete-stock', ['only'=>['index']]);
        $this->middleware('permission:show-stock', ['only'=>['create', 'store']]);
        $this->middleware('permission:edit-stock', ['only'=>['edit', 'update']]);
        $this->middleware('permission:delete-stock', ['only'=>['destroy']]);
    }


    public function index()
    {
        //ID FOR THE USER
        $userId = Auth::id();

        //COMMAND TO SHOW GRAPHIC
        $filterChart = DB::table('orders')
        ->select('model', 'color', DB::raw('SUM(quantity) as total_cantidad'))
        ->groupBy('model', 'color')
        ->where('user_id', $userId)->get();

        $productsSold = Order::select('model', 'color', DB::raw('SUM(quantity) as total_quantity'))
                ->groupBy('model', 'color')
                ->orderBy('total_quantity', 'DESC')
                ->limit(3)
                ->get();

        $productsRequested = Stock::select('model', 'color', DB::raw('SUM(quantity) as total_quantity'))
        ->groupBy('model', 'color')
        ->orderBy('total_quantity', 'DESC')
        ->limit(3)
        ->get();

        return Inertia::render('Dept_Warehouse/Index', 
        [
            'filterChart' => $filterChart,
            'productsSold' => $productsSold,
            'productsRequested' => $productsRequested,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'model' => ['required', 'string'],
            'category' => ['required', 'string'],
            'color' => ['required', 'string'],
            'quantity' => ['required'],
            'image' => 'required|image|mimes:png,jpg,jpeg,svg,webp|max:1024'
        ]);

        $myFoto ="";
        if($request->hasFile('image')){
            $image = $request->file('image');
            $routeToImg = 'images/3.warehouse_view/';
            $imageName = date('YmdHis'). ".".$image->getClientOriginalExtension();
            $image->move($routeToImg, $imageName); 
            $myFoto = $imageName;  
        } 
        
        $newProduct = new Stock();
        $newProduct->model = $request->model;
        $newProduct->category = $request->category;
        $newProduct->color = $request->color;
        $newProduct->quantity = $request->quantity;
        $newProduct->image = $myFoto;
        $newProduct->save();

        return Inertia::render('Dept_Warehouse/Stock');
    }

    /**
     * Display the specified resource.
     */
    public function show($identifier)
    {
        $orderDetailID = $identifier;
        $user_id = Auth::id();
        $employeeData = Employee::where('user_id', $user_id)->get();
        $employees = Employee::select('id', 'name', 'area')->get();
        $sellerID = $employeeData[0]->id;


        $allCompleteTable = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed', 
        'order_details.date_to_produce', 
        'order_details.date_to_deliver', 
        'order_details.sent_to', 
        'order_details.receiver',
        'order_details.foto_1', 'order_details.foto_2')->where('order_details.confirmed', '!=', null)->get();


        $employeeTable = DB::table('department_productions')
        ->join('employees', 'employees.id', '=', 'department_productions.id_employee')
        ->select('department_productions.*', 
        'employees.id', 
        'employees.user_id', 
        'employees.name', 
        'employees.foto', 
        'employees.area',
        'employees.job_position',
        'employees.email', 'employees.address')->get();


        $myStock = Stock::all();

        if($identifier === "register"){
            return Inertia::render('Dept_Warehouse/Register', ['completeTable' => $allCompleteTable]);
        } else if($identifier === "stock"){
            return Inertia::render('Dept_Warehouse/Stock', ['myStock' => $myStock]);
        } else {
            return Inertia::render('Dept_Warehouse/RegisterDetail', 
            [
             'allCompleteTable' => $allCompleteTable, 
             'orderDetailID' => $orderDetailID,
             'employees' => $employees,
             'employeeTable' => $employeeTable
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        //
    }


    public function update(Request $request, Stock $stock)
    {

        $request->validate([
            'model' => ['required', 'string'],
            'category' => ['required', 'string'],
            'color' => ['required', 'string'],
            'quantity' => ['required'],
        ]);

        $stock->model = $request->model;
        $stock->category = $request->category;
        $stock->color = $request->color;
        $stock->quantity = $request->quantity;
        $stock->save();
    

    return Redirect::route('stock.show', "register");
    /*  return Inertia::render('Dept_Warehouse/Stock'); */
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
