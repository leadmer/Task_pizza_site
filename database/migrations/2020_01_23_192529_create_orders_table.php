<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name_customer');
            $table->string('telephone_number');
            $table->string('delivery_address');
            $table->string('pizza');
            $table->integer('count');
            $table->decimal('price_in_euro');
            $table->decimal('price_in_dollar');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
