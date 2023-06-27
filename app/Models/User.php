<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

//Spatie
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;
    
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function cartOrders()
    {
        return $this->hasMany(CartStore::class);
    }

    public function companies()
    {
        return $this->hasMany(Client::class);
    }

    public function messages()
    {
        return $this->hasMany(Chat::class);
    }

    public function tracks()
    {
        return $this->hasMany(Track::class);
    }


    protected $fillable = [
        'name',
        'email',
        'password',
        'foto',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
