<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'Orders';

    protected $fillable = [
      'name_customer', 'telephone_number', 'delivery_address', 'pizza', 'count', 'price_in_euro', 'price_in_dollar'
    ];

    public $timestamps = false;
}
