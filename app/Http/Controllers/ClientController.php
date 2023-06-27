<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

//NEWS
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class ClientController extends Controller
{

    public function index()
    {
        return Inertia::render('Clients/Index');
    }

    public function showRegister()
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
                'name' => 'required',
                'phone' => 'required',
                'address' => 'required',
                'logo' => 'required',
            ]); 
    
            $request->user()->companies()->create($validated);
            return Inertia::render('Clients/ToConfirm');
        
    }

    
    public function edit(Client $client)
    {
        //
    }

    
    public function update(Request $request, Client $client)
    {
        //
    }

   
    public function destroy(Client $client)
    {
        //
    }
}
