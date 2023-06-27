<?php

namespace App\Http\Controllers;

//-----MY REQUEST
use Illuminate\Http\Request;

//----------------------------TABLES OR MODELS
use App\Models\Chat;
use App\Models\User;
use App\Models\Employee;
use App\Models\Client;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\DepartmentSale;
use Illuminate\Support\Facades\DB;

//----------------------------COMPLEMENTS
//-----INERTIA
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Collection;

//-----MY USER INFO
use Illuminate\Support\Facades\Auth;

//EVENT TO PUSHER
use App\Events\Message;
use Pusher\Pusher;

class ChatController extends Controller
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

        $chats = Chat::all();
        $myEmployeeID = strval($sellerID);


        return Inertia::render('Chats/Index', 
        ['myClients' => $myClients, 
        'myFriends' => $myFriends, 
        'employees' => $employees,
        'allClients' => $allClients,
        'chats' => $chats,
        'myEmployeeID' => $myEmployeeID
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {

        $validated = $request->validate([
            'channel' => 'required',
            'message' => 'required',
        ]);

       $chat = new Chat();
        $chat->channel = $request->channel;
        $chat->user_id = $request->user_id;
        $chat->message = $request->message;
        $chat->save();

        //PUSHER 
        
            event(new Message($request->message, $request->channel, $chat->created_at, $chat->user_id));
        


        return to_route('chat.index');
    }


    public function show(Chat $chat)
    {
        //
    }

  
    public function edit(Chat $chat)
    {
        
    }


    public function update(Request $request, Chat $chat)
    {
        //PUSHER CREDENTIALS
        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true,
            ]
        );

        $pusher->trigger($request->channel, 'privateChannel', ['message' => $request->message]);
    }


    public function destroy(Chat $chat)
    {
        //
    }

    public function message(Request $request)
    {
        event(new Message($request->input('channel'), $request->input('message')));
        return [];
    }
}
