<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClaimOrder extends Model
{
    use HasFactory;

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    protected $fillable = [
        'order_id',
        'title',
        'content',
        'solution',
    ];
}
