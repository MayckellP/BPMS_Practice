<?php

namespace App\Http\Controllers;

use App\Models\DepartmentSale;
use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Client;
use App\Models\Stock;
use App\Models\ClaimOrder;
use App\Models\Employee;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

//CARBON
use Carbon\Carbon;

//EVENT TO PUSHER
use App\Events\TrackMessage;
use Pusher\Pusher;


class DepartmentSaleController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:show-order-sale|create-order-sale|edit-order-sale|delete-order-sale', ['only'=>['index']]);
        $this->middleware('permission:create-order-sale', ['only'=>['create', 'store']]);
        $this->middleware('permission:edit-order-sale', ['only'=>['edit', 'update']]);
        $this->middleware('permission:delete-order-sale', ['only'=>['destroy']]);
    }

    public function index(Request $request)
    {
        //ID FOR THE USER
        $userId = Auth::id();
        $registerID = Employee::where('user_id', $userId)->get();
        $sellerID = $registerID[0]->id;

        //COMMAND TO SHOW GRAPHIC
        $filterChart = DB::table('orders')
        ->select('model', 'color', DB::raw('SUM(quantity) as total_cantidad'))
        ->groupBy('model', 'color')
        ->where('seller_id', $sellerID)
        ->orderBy('total_cantidad', 'DESC')
        ->limit(3)->get();

        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myOrders = Order::where('user_id', $userId)->get();

        //SHOW MY PERFORMANCE
        $currentMonth = Carbon::now()->format('m');

        /* $myPerformance = DB::table('department_sales')
        ->select(DB::raw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total, SUM(monthly_performance) as total_price'))
        ->groupBy('year', 'month')->where('id_employee', $sellerID)
        ->get(); */

        $idEmployee = $sellerID;
        $year = Carbon::now()->year;

        $myPerformance = DB::table(DB::raw("(SELECT $year as year) as years"))
        ->crossJoin(DB::raw("(SELECT 1 as month UNION ALL
                SELECT 2 as month UNION ALL
                SELECT 3 as month UNION ALL
                SELECT 4 as month UNION ALL
                SELECT 5 as month UNION ALL
                SELECT 6 as month UNION ALL
                SELECT 7 as month UNION ALL
                SELECT 8 as month UNION ALL
                SELECT 9 as month UNION ALL
                SELECT 10 as month UNION ALL
                SELECT 11 as month UNION ALL
                SELECT 12 as month) as months"))
        ->leftJoin(DB::raw("(SELECT YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total, SUM(monthly_performance) as total_price
            FROM department_sales
            WHERE YEAR(created_at) = $year AND id_employee = ?
            GROUP BY year, month) as data"), function ($join) {
                $join->on('years.year', '=', 'data.year')
                    ->on('months.month', '=', 'data.month');
        })
        ->where('months.month', '<=', function ($query) use ($year) {
            $query->select(DB::raw('MAX(MONTH(created_at))'))
                ->from('department_sales')
                ->where(DB::raw('YEAR(created_at)'), '=', $year);
        })
        ->orderBy('months.month')
        ->select('years.year', 'months.month', DB::raw('IFNULL(data.total, 0) as total'), DB::raw('IFNULL(data.total_price, 0) as total_price'))
        ->setBindings([$idEmployee, $year])
        ->get();


        return Inertia::render('Dept_Sales/Index', 
        [
            'filterChart' => $filterChart,
            'myOrders' => $myOrders,
            'myPerformance' => $myPerformance
        ]);

    }

    public function show($identifier)
    {
        $orderDetailID = $identifier;
        $user_id = Auth::id();
        //$registerID = DB::table('users')->where('id', $user_id)->join('employees', 'users.id', '=', 'employees.id_user')->select('employees.id')->get();
        $employeeData = Employee::where('user_id', $user_id)->get();
        $sellerID = $employeeData[0]->id;
        $myOrders = Order::where('user_id', $user_id)->get();

        $employees = Employee::select('id', 'name', 'area')->get();

        $completeTable = DB::table('orders')->where('seller_id', $sellerID)
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed', 
        'order_details.date_to_produce', 
        'order_details.date_to_deliver', 
        'order_details.sent_to', 
        'order_details.receiver',
        'order_details.foto_1', 'order_details.foto_2')->get();

        $allCompleteTable = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed', 
        'order_details.date_to_produce', 
        'order_details.date_to_deliver', 
        'order_details.sent_to', 
        'order_details.receiver',
        'order_details.foto_1', 'order_details.foto_2')->get();

        if($identifier === "register"){
            return Inertia::render('Dept_Sales/Register', ['myOrders' => $myOrders, 'completeTable' => $completeTable, 'sellerID' => $sellerID]);
        } else{
            return Inertia::render('Dept_Sales/RegisterDetail', 
            ['myOrders' => $myOrders,
             'allCompleteTable' => $allCompleteTable, 
             'orderDetailID' => $orderDetailID,
             'employees' => $employees
            ]);
        }
        
    }

    public function create()
    {
        $identifierURL = "QuickPurchase";
        $stock = Stock::all();
        $clients = Client::all();
        $filterStock = Stock::distinct()->pluck('model');
        return Inertia::render('Dept_Sales/Crear', compact('stock', 'filterStock', 'identifierURL', 'clients'));
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'model' => 'required',
            'category' => 'required',
            'quantity' => 'required',
            'color' => 'required',
            'image' => 'required',
            'user_id' => 'required'
        ]);

        $showID = $request->user()->orders()->create($validated);

        $showID->user_id = $request->user_id;
        $showID->save();
        
        $orderDetail = new OrderDetail();

        $orderDetail->order_id = $showID->id;;
        $orderDetail->created_at = $request->created_at;

        $orderDetail->save(); 

        $confirmedCount = OrderDetail::where('confirmed', null)->count();
        $date_to_produceCount = OrderDetail::where('date_to_produce', null)->count();
        $date_to_deliverCount = OrderDetail::where('date_to_deliver', null)->count();
        $deliveredCount = OrderDetail::where('sent_to', null)->count();

        //PUSHER 
        event(new TrackMessage($orderDetail->created_at, $confirmedCount, $date_to_produceCount, $date_to_deliverCount, $deliveredCount));


        return to_route('deptSales.index');
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
