<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'seller_id', 'id');
    }

    public function deptSale()
    {
        return $this->belongsTo(DepartmentSale::class, 'id_employee');
    }

    public function deptProduction()
    {
        return $this->belongsTo(DepartmentProduction::class, 'id_employee');
    }

    public function deptLogistic()
    {
        return $this->belongsTo(DepartmentLogisctic::class, 'id_employee');
    }

    protected $fillable = [
            'name',
            'lastname',
            'foto',
            'area',
            'job_position',
            'email',
            'address',
            'phone',
    ];
}
