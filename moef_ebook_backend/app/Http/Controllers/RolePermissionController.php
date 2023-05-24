<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
class RolePermissionController extends Controller
{
// Create all_roles
public function createRole(Request $request){
    // dd($request->name);
  $role =new Role();
  $role->name=$request->name;
  $role->save();
  return response()->json(
    [
        'status'=>200,
        'message'=>'Role created successfully',
        'roles'=>$role
    ]);

  }

  public function getAllRoles(){
    $all_roles=Role::all();
      return response()->json(
    [
        'status'=>200,
        'all_roles'=>$all_roles
    ]);
  }

  // Create Permissions
public function createPermission(Request $request){
  $permission =new Permission();
  $permission->name=$request->name;
  $permission->save();
  return response()->json(
    [
        'status'=>200,
        'message'=>'Permission created successfully',
        'permissions'=>$permission
    ]);

  }



// Assign permissions to the role

public function assignPermissionViaRole(Request $request,$id){
    $role=Role::where('id',$id)->first();
    $permissions=$request->all();
    $result = [];

// Loop through the object and extract keys with value true
foreach ($permissions as $key => $value) {
    if ($value === true) {
        $result[] = $key;
    }
}

$permissions = Permission::whereIn('name', $result)->get();
$role->syncPermissions($permissions);

  return response()->json(
    [
        'status'=>200,
        'message'=>'Assigned Permission via role successfully',
        'permissions'=>$permissions
    ]);
}

public function getPermissionViaRole($id){
    $role=Role::where('id',$id)->first();
$permissions=$role->permissions->pluck('name');

  return response()->json(
    [
        'status'=>200,
        'permissions'=>$permissions,
        'role'=>$role
    ]);
}
public function check(){
// $user = User::find(13);

// $user->assignRole('Super admin');

  return response()->json(
    [
        'status'=>200,
        'message'=>'User role created successfully'
    ]);
}
}


