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
            $table->foreignId('from_location_id');
            $table->foreign('from_location_id')->references('id')->on('locations');
            $table->foreignId('to_location_id');
            $table->foreign('to_location_id')->references('id')->on('locations');
            $table->integer('duration');
            $table->integer('cost');
            $table->boolean('status');
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
