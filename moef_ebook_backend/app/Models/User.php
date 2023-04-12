<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'UserID';

    protected $fillable = [
        'UserID', 'OfficeID', 'UserName', 'userPhone', 'userEmail', 'userPassword',
    ];

    protected $hidden = [
        'userPassword',
    ];

    public function getAuthIdentifierName()
    {
        return 'UserID';
    }

    public function getAuthIdentifier()
    {
        return $this->UserID;
    }

    public function getAuthPassword()
    {
        return $this->userPassword;
    }

    public function getTokenableId()
    {
        return $this->getKey();
    }

    public function isSuperAdmin()
    {
        return $this->super_admin;
    }
}

