<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RateOrder extends Model
{
    use HasFactory;

    public function Order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
    
    protected $fillable = [
        'order_id',
        'rating',
    ];
}
