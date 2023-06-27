<?php

namespace App\Http\Controllers;

use App\Models\DepartmentLogistic;
use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Stock;
use App\Models\ClaimOrder;
use App\Models\Employee;
use App\Models\OrderDetail;
use App\Models\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

//CARBON
use Carbon\Carbon;

//EVENT TO PUSHER
use App\Events\TrackMessage;
use App\Events\TrackCompany;
use Pusher\Pusher;

class DepartmentLogisticController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:goTo_dept_logistic|goTo_dept_logistic_employee', ['only'=>['index']]);
        $this->middleware('permission:goTo_dept_logistic_register|goTo_dept_logistic_register_employee', ['only'=>['show']]);
    }


    public function index()
    {
       //ID FOR THE USER
        $userId = Auth::id();
        $registerID = Employee::where('user_id', $userId)->get();
        $employeeID = $registerID[0]->id;

        $productsChart = DB::table('department_logistics')
        ->join('orders', 'department_logistics.id_order', '=', 'orders.id')
        ->select('orders.model', 'orders.color', DB::raw('SUM(department_logistics.quantity) AS total_quantity'))
        ->groupBy('orders.model', 'orders.color')
        ->orderBy('total_quantity', 'DESC')
        ->limit(3)
        ->get();


        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myOrders = Order::where('user_id', $userId)->get();

        //SHOW MY PERFORMANCE
        $currentMonth = Carbon::now()->format('m');

        
        $myPerformance = DB::table('department_sales')
        ->select(DB::raw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total, SUM(monthly_performance) as total_price'))
        ->groupBy('year', 'month')->where('id_employee', $employeeID)
        ->get();


        return Inertia::render('Dept_Logistic/Index', 
        [
            'employeeID' => $employeeID,
            'productsChart' => $productsChart,
            'myPerformance' => $myPerformance
        ]);
    }

 
    public function create()
    {
        //
    }

 
    public function store(Request $request)
    {

        if(isset($request->foto_1)){
            $request->validate([
                'foto_1' => 'required|image|mimes:png,jpg,jpeg,svg,webp|max:1024',
            ]);  
    
            $myFoto ="" ;
            if($request->hasFile('foto_1')){
                $image = $request->file('foto_1');
                $routeToImg = 'images/deliveredProduct_img/';
                $imageName = date('YmdHis'). ".".$image->getClientOriginalExtension();
                $image->move($routeToImg, $imageName); 
                $myFoto = $imageName;  
            }
            //------------------------------------------------------------- ADD NEW DATAS IN ORDER_DETAILS TABLE
            $ordersDetail = OrderDetail::where('order_id', $request->order_id)->get();
            foreach($ordersDetail as $detail){
                $detail->receiver = $request->receiver;
                $detail->foto_1 = $myFoto;
                $detail->save();
            
                $detail->sent_to = $detail->updated_at;
                $detail->save();
            }
    
        } 

        //------------------------------------------------------------- PUSHER TO AUTH LAYOUT
        $created_at = [];
        $confirmedCount = OrderDetail::where('confirmed', null)->count();
        $date_to_produceCount = OrderDetail::where('date_to_produce', null)->count();
        $date_to_deliverCount = OrderDetail::where('date_to_deliver', null)->count();
        $deliveredCount = OrderDetail::where('sent_to', null)->count();

        //------------------------------------------------------------- EVENT OF PUSHER - TRACKMESSAGE
        event(new TrackMessage($created_at, $confirmedCount, $date_to_produceCount, $date_to_deliverCount, $deliveredCount));

        //------------------------------------------------------------- SHOW ALL CLIENTS
        $companyClients = Client::all();

        //------------------------------------------------------------- SHOWW ALL ORDERS OF CLIENTS
        $allOrdersClients = DB::table('orders')->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 'order_details.*')->orderBy('orders.created_at', 'desc')->get();

        //------------------------------------------------------------- ADD IN AN ARRAY ALL ABOUT MY CLIENT (ORDERS AND COMPANY)
        $orders = [];

        foreach($allOrdersClients as $clientDetail){
            foreach($companyClients as $companyDetail){
                if($clientDetail->user_id === $companyDetail->user_id){
                    array_push($orders, [
                        'company' => $companyDetail,
                        'client' => $clientDetail,
                    ]);
                }
            }    
        }
        //------------------------------------------------------------- EVENT OF PUSHER - TRACKCOMPANY
        event(new TrackCompany($orders));

        return to_route('deptLogistic.show', 'register');
    }


    public function show($identifier)
    {

        $user_id = Auth::id();

        //---------------------------------------------- TO REGISTER AND REGISTER DETAILS VIEW
        $allCompleteTable = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed', 
        'order_details.date_to_produce', 
        'order_details.date_to_deliver', 
        'order_details.sent_to', 
        'order_details.receiver',
        'order_details.foto_1', 'order_details.foto_2')->where('order_details.confirmed', '!=', null)->get();

        $orderDetailID = $identifier;
        $employees = Employee::select('id', 'name', 'area')->get();

        //---------------------------------------------- TO ROUTES DETAILS VIEW

        $routesCount = DepartmentLogistic::join('employees', 'employees.id', '=', 'department_logistics.id_employee')
        ->select('department_logistics.auto', 'employees.name')->distinct()->get();

        $routes = DepartmentLogistic::join('employees', 'department_logistics.id_employee', '=', 'employees.id')
        ->join('orders', 'department_logistics.id_order', '=', 'orders.id')
        ->join('clients', 'orders.user_id', '=', 'clients.user_id')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('department_logistics.auto', 'employees.name', 'orders.model', 'orders.id', 
        'orders.quantity', 'orders.color', 'clients.name', 'order_details.sent_to')
        ->get();
        



        if($identifier === "register"){
            return Inertia::render('Dept_Logistic/Register', ['completeTable' => $allCompleteTable]);
        } elseif ($identifier === "RoutesDetails") {
            return Inertia::render('Dept_Logistic/RoutesDetails', 
            ['routesCount' => $routesCount,
            'routes' => $routes]);
        } else {
            return Inertia::render('Dept_Logistic/RegisterDetail', 
            [
             'allCompleteTable' => $allCompleteTable, 
             'orderDetailID' => $orderDetailID,
             'employees' => $employees
            ]);
        }
        
    }

 
    public function edit(DepartmentLogistic $departmentLogistic)
    {
        //
    }

 
    public function update(Request $request, DepartmentLogistic $departmentLogistic)
    {
        //
    }

 
    public function destroy(DepartmentLogistic $departmentLogistic)
    {
        //
    }
}
