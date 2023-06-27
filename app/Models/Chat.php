<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    public function order()
    {
        return $this->hasMany(Order::class, 'id_order');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'id_employee');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'monthly_performance',
        'channel',
        'message,'
    ];
}
