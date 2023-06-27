<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Employee;
use App\Models\Client;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        $userId = Auth::id();
        $request->user()->save();
        $clientFoto = Client::select('logo')->where('user_id', $userId )->get();
        $employeeFoto = "hola";
        /* Employee::where('user_id', $userId)->first(); */


        return Redirect::route('profile.edit', ['employeeFoto' => $employeeFoto]);
    }

    public function addImage(Request $request)
    {

        if(isset($request->foto)){
            $request->validate([
                'foto' => 'required|image|mimes:png,jpg,jpeg,svg,webp|max:1024',
            ]);  
    
            $myFoto ="" ;
            if($request->hasFile('foto')){
                $image = $request->file('foto');
                $routeToImg = 'images/profile_img/';
                $imageName = date('YmdHis'). ".".$image->getClientOriginalExtension();
                $image->move($routeToImg, $imageName); 
                $myFoto = $imageName;  
            }
    
    
            $employees = Employee::all();
            $users = User::all();
    
            foreach ($users as $user) {
                if(Auth::id() === $user->id){
                    $user->foto = $myFoto;
                    $user->save();
                }
            }
    
            foreach ($employees as $employee) {
                if(Auth::id() === $employee->user_id){
                    $employee->foto = $myFoto;
                    $employee->save();
                }
            } 
        } else {

            $request->validate([
                'logo' => 'required|image|mimes:png,jpg,jpeg,svg,webp|max:1024'
            ]); 
    
            $myLogo ="" ;
            if($request->hasFile('logo')){
                $imageLogo = $request->file('logo');
                $routeToImgLogo = 'images/logo_img/';
                $imageLogoName = date('YmdHis'). ".".$imageLogo->getClientOriginalExtension();
                $imageLogo->move($routeToImgLogo, $imageLogoName); 
                $myLogo = $imageLogoName;  
            }
    
            $clients = Client::all();
            $users = User::all();
    
            foreach ($users as $user) {
                if(Auth::id() === $user->id){
                    $user->logo = $myLogo;
                    $user->save();
                }
            }
    
            foreach ($clients as $client) {
                if(Auth::id() === $client->user_id){
                    $client->logo = $myLogo;
                    $client->save();
                }
            }

        }

        return Redirect::route('profile.edit');
    }

    
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
