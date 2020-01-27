<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    protected $table = 'Pizzas';

    protected $fillable = ['name', 'description', 'price_in_dollar', 'price_in_euro'];
}
