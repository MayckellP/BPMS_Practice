<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//NEWS
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Employee;
use App\Models\Client;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Collection;


class UserController extends Controller
{

    public function index()
    {
        $users = User::paginate(15);
        $roles = Role::get();
        $relation = DB::table('model_has_roles')->get();
 
        return Inertia::render('Users/Index', compact('users', 'relation', 'roles'));
    }


    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Users/Crear', compact('roles'));
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|same:password_confirmation',
            'roles' => 'required'
        ]); 
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($request->input('roles'));

        $employee = new Employee();
        
        $employee->user_id = $user->id;
        $employee->name = $user->name;
        $employee->email = $user->email;
        $employee->area = $request->area;
        $employee->job_position = $request->job_position;
        $employee->address = $request->address;
        $employee->phone = $request->phone;

        $employee->save();

        return to_route('users.index');
    }


    public function edit($id)
    {
        $user = User::find($id);
        $roles = Role::all();
        $userRole = $user->roles->pluck('name', 'name')->all();
        $company = Client::where('user_id', $id)->get();
        $employee = Employee::where('user_id', $id)->get();

        return Inertia::render('Users/Editar', compact('user', 'roles', 'userRole', 'company', 'employee'));
    }


    public function update(Request $request, $id)
    {

        $input = $request->all();
        if(!empty($input['password'])){
            $input['password'] = Hash::make($input['password']);
        } else{
            $input = Arr::except($input, array('password'));
        }

        $user = User::find($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id', $id)->delete();
        $user->assignRole($request->input('roles'));

        return to_route('users.index');
    }


    public function destroy($id)
    {
        Employee::where('id_user', $id)->delete();
        User::find($id)->delete();

        return to_route('users.index');
    }
}
