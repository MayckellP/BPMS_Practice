<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'seller_id', 'id');
    }
    
    protected $fillable = [
        'name',
        'phone',
        'address',
        'logo',
    ];
}
