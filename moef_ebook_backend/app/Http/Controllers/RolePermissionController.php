<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
class RolePermissionController extends Controller
{
// Create roles
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

public function assignPermissionViaRole(){
    $role=Role::where('id',1)->first();
    // dd($role);
// $permissions = Permission::whereIn('name', ['create', 'read', 'update', 'delete'])->get();
$permissions = Permission::all()->take(3);
$role->syncPermissions($permissions);

$user=User::find(9);
$user->assignRole(1);

  return response()->json(
    [
        'status'=>200,
        'message'=>'Assigned Permission via role successfully',
        // 'permissions'=>$permission
    ]);
}

public function getPermissionViaRole($id){
    $user=User::find($id);

$permissions = $user->getAllPermissions(); // collection of permission objects


  return response()->json(
    [
        'status'=>200,
        'data'=>$user,
        // 'permissions'=>$permissions
    ]);
}
}


