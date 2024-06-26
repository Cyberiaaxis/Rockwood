<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTravelRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('travel_routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_city_id');
            $table->foreign('from_city_id')->references('id')->on('cities');
            $table->foreignId('to_city_id');
            $table->foreign('to_city_id')->references('id')->on('cities');
            $table->integer('duration');
            $table->integer('cost');
            $table->boolean('status');
            $table->integer('coordinateX')->nullable(); // X coordinate (numeric value)
            $table->integer('coordinateY')->nullable(); // Y coordinate (numeric value)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('travel_routes');
    }
}
