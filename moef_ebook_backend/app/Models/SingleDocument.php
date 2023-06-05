<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class SingleDocument extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo('App\Models\User','created_by');
    }
 
      public function getTargetUsersAttribute($value)
    {
    

    if (strpos($value, ',') !== false) {
           $userIds = explode(',', $value);
        $users = User::whereIn('id', $userIds)->get();
        return $users;     

} else {
    return $value;
}
}
}
