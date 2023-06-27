<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//NEWS
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class RolController extends Controller
{
    function __construct()
    {
        $this->middleware('permission: show-rol|create-rol|edit-rol|delete-rol', ['only'=>['index']]);
        $this->middleware('permission: create-rol', ['only'=>['create', 'store']]);
        $this->middleware('permission: edit-rol', ['only'=>['edit', 'update']]);
        $this->middleware('permission: delete-rol', ['only'=>['destroy']]);
    }


    public function index()
    {
        $roles = Role::paginate(50);
        $permisos = Permission::all();
        return Inertia::render('Roles/Index', compact('roles', 'permisos'));
    }

  
    public function create()
    {
        $permission = Permission::get();
        return Inertia::render('Roles/Crear', compact('permission'));
    }

 
    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'required', 'permission' => 'required']);
        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permission'));

        return to_route('roles.index');
    }


    public function edit( $id)
    {
        $role = Role::find($id);
        $permission = Permission::get();
        $rolePermission = DB::table('role_has_permissions')->where('role_has_permissions.role_id', $id)
            ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->all();

        return Inertia::render('Roles/Editar', compact('role', 'permission', 'rolePermission'));
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, ['name' => 'required', 'permission' => 'required']);
        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();
        $role->syncPermissions($request->input('permission'));

        return to_route('roles.index');
    }


    public function destroy($id)
    {
        DB::table('roles')->where('id', $id)->delete();
        return to_route('roles.index');
    }
}
