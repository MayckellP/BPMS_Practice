<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function seller()
    {
        return $this->belongsTo(Employee::class, 'seller_id');
    }

    public function deptSale()
    {
        return $this->belongsTo(DepartmentSale::class, 'id_order');
    }

    public function deptProduction()
    {
        return $this->belongsTo(DepartmentProduction::class, 'id_order');
    }

    public function details()
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }


    public function rating()
    {
        return $this->hasMany(RateOrder::class, 'order_id', 'id');
    }

    public function claims()
    {
        return $this->hasMany(ClaimOrder::class, 'order_id', 'id');
    }

    protected $fillable = [
        'model',
        'category',
        'quantity',
        'color',
        'image',
    ];
}