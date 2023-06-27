<?php

namespace App\Http\Controllers;

//-----MY REQUEST
use Illuminate\Http\Request;

//----------------------------TABLES OR MODELS
use App\Models\Track;
use App\Models\Chat;
use App\Models\User;
use App\Models\Employee;
use App\Models\Client;
use App\Models\Order;
use App\Models\Stock;
use App\Models\OrderDetail;
use App\Models\DepartmentSale;
use App\Models\DepartmentProduction;
use App\Models\DepartmentLogistic;
use Illuminate\Support\Facades\DB;

//----------------------------COMPLEMENTS
//-----INERTIA
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Collection;

//-----MY USER INFO
use Illuminate\Support\Facades\Auth;

//EVENT TO PUSHER
use App\Events\TrackMessage;
use App\Events\TrackCompany;
use Pusher\Pusher;

class TrackController extends Controller
{
    public function index()
    {
        //SHOW MI ID AS USER
        $user_id = Auth::id();

        //SHOW MY ID AS EMPLOYEE
        $registerID = Employee::where('user_id', $user_id)->get();
        $sellerID = $registerID[0]->id;

        //SHOW ALL CLIENTS
        $companyClients = Client::all();

        //SHOW ALL ORDERS OF MY CLIENTS
        $ordersClients = DB::table('orders')->where('seller_id', $sellerID)
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 'order_details.*')->get();

        //SHOW ALL ORDERS OF CLIENTS
        $allOrdersClients = DB::table('orders')->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 'order_details.*')->orderBy('orders.created_at', 'desc')->get();

        //SHOW IN AN ARRAY ALL ABOUT MY CLIENT (ORDERS AND COMPANY)
        $myClients = [];

        foreach($ordersClients as $clientDetail){
            foreach($companyClients as $companyDetail){
                if($clientDetail->user_id === $companyDetail->user_id){
                    array_push($myClients, [
                        'company' => $companyDetail,
                        'client' => $clientDetail,
                    ]);
                }
            }    
        }

        //SHOW IN AN ARRAY ALL ABOUT MY CLIENT (ORDERS AND COMPANY)
        $allClients = [];

        foreach($allOrdersClients as $clientDetail){
            foreach($companyClients as $companyDetail){
                if($clientDetail->user_id === $companyDetail->user_id){
                    array_push($allClients, [
                        'company' => $companyDetail,
                        'client' => $clientDetail,
                    ]);
                }
            }    
        }

        //SHOW MY COLLEGE OF COMPANY
        $myFriends = Employee::where('id', '!=', $sellerID)->get();
        $employees = Employee::all();

        $employeesToProduction = Employee::where('area', 'production_department')->where('job_position', 'employee')->get();

        $employeesToLogistic = Employee::where('area', 'logistic_department')->where('job_position', 'employee')->get();



        return Inertia::render('Tracks/Index', 
        ['myClients' => $myClients, 
        'myFriends' => $myFriends, 
        'employees' => $employees,
        'employeesToProduction' => $employeesToProduction,
        'employeesToLogistic' => $employeesToLogistic,
        'allClients' => $allClients
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {

        if(!isset($request->id_employee)){
            //------------------------------------------------------------- SHOW MY ID AS EMPLOYEE
            $user_id = Auth::id();
            $registerID = Employee::where('user_id', $user_id)->get();
            $sellerID = $registerID[0]->id;

            //------------------------------------------------------------- POST TO DEPARTMENT SALES
            $dept_Sale = new DepartmentSale();
            $dept_Sale->id_employee = $sellerID;
            $dept_Sale->id_order = $request->order_id;
            $dept_Sale->monthly_performance = $request->monthly_performance;
            $dept_Sale->save();

            //------------------------------------------------------------- ADD NEW DATAS IN ORDER TABLE
            $orders = Order::where('id', $dept_Sale->id_order)->get();
            foreach($orders as $order){
                $order->seller_id = $dept_Sale->id_employee;
                $order->save();
            }

            //------------------------------------------------------------- ADD NEW DATAS IN ORDER_DETAILS TABLE
            $ordersDetail = OrderDetail::where('order_id', $dept_Sale->id_order)->get();
            foreach($ordersDetail as $detail){
                $detail->confirmed = $dept_Sale->created_at;
                $detail->save();
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

            //------------------------------------------------------------- NEW VALUE IN QUANTITY STOCK
            $stock = Stock::all();

            foreach ($stock as $product) {
                if($request->model === $product->model && $request->color === $product->color ){
                    $altQuantity = $product->quantity;
                    $quantityOrder = $request->quantity;
                    $newQuantity = $altQuantity - $quantityOrder;   

                    $product->quantity = $newQuantity;
                    $product->save();
                    //dd($product->all());
                }
            }
            //------------------------------------------------------------- EVENT OF PUSHER - TRACKCOMPANY
            event(new TrackCompany($orders));

            return to_route('deptSales.show', 'register');
        } else if (isset($request->driver)){

            //------------------------------------------------------------- POST TO DEPARTMENT LOGISTIC
            $dept_Logistic = new DepartmentLogistic();
            $dept_Logistic->id_employee = $request->id_employee;
            $dept_Logistic->id_order = $request->order_id;
            $dept_Logistic->auto = $request->auto;
            $dept_Logistic->driver = $request->driver;
            $dept_Logistic->co_driver = $request->co_driver;
            $dept_Logistic->route_address = $request->route_address;
            $dept_Logistic->quantity = $request->quantity;
            $dept_Logistic->save();

            //------------------------------------------------------------- ADD NEW DATAS IN ORDER_DETAILS TABLE
            $ordersDetail = OrderDetail::where('order_id', $dept_Logistic->id_order)->get();
            foreach($ordersDetail as $detail){
                $detail->date_to_deliver = $dept_Logistic->created_at;
                $detail->save();
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
        } else if (isset($request->id_employee)){

            //------------------------------------------------------------- POST TO DEPARTMENT PRODUCTION
            $dept_Production = new DepartmentProduction();
            $dept_Production->id_employee = $request->id_employee;
            $dept_Production->id_order = $request->order_id;
            $dept_Production->quantity = $request->quantity;
            $dept_Production->activity = $request->activity;
            $dept_Production->save();

            //------------------------------------------------------------- ADD NEW DATAS IN ORDER_DETAILS TABLE
            $ordersDetail = OrderDetail::where('order_id', $dept_Production->id_order)->get();
            foreach($ordersDetail as $detail){
                $detail->date_to_produce = $dept_Production->created_at;
                $detail->save();
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

            return to_route('deptProduction.show', 'register');
        } 
    }


    public function show($id)
    {
         //SHOW MI ID AS USER
         $user_id = Auth::id();

         //SHOW ALL CLIENTS
        $companyClients = Client::all();

        //SHOW ALL ORDERS OF CLIENTS
        $myOrders = DB::table('orders')->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->join('clients', 'orders.user_id', '=', 'clients.user_id')
        ->select('orders.*', 'order_details.*', 'clients.name')->where('orders.user_id', $user_id)->orderBy('orders.created_at', 'desc')->get();

        //SHOW IN AN ARRAY ALL ABOUT MY CLIENT (ORDERS AND COMPANY)
        $myOrdersTrack = [];

        foreach($myOrders as $myTrack){
            foreach($companyClients as $companyDetail){
                if($myTrack->user_id === $companyDetail->user_id){
                    array_push($myOrdersTrack, [
                        'company' => $companyDetail,
                        'client' => $myTrack,
                    ]);
                }
            }    
        }

        return Inertia::render('Tracks/Client', 
        ['myOrdersTrack' => $myOrdersTrack, 
        ]);
    }

  
    public function edit(Chat $chat)
    {
        
    }


    public function update(Request $request, Chat $chat)
    {
        //
    }


    public function destroy(Chat $chat)
    {
        //
    }
}