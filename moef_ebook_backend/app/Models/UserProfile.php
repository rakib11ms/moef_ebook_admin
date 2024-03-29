<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;
    protected $table = 'user_profiles';
    protected $primaryKey = 'id';
    protected $fillable = [
        'UserID',
        'BookID',
        'BookmarksID',
        'NotificationID',
        'isEmail',
        'isPhone',
        'isUserName',
        'isPicture',
        'isVerified',
    ];
}
