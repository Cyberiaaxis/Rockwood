<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TravelRoutesTable extends Migration
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
            $table->foreignId('from_country_id');
            $table->foreign('from_country_id')->references('id')->on('countries');
            $table->foreignId('from_city_id');
            $table->foreign('from_city_id')->references('id')->on('cities');
            $table->foreignId('from_region_id');
            $table->foreign('from_region_id')->references('id')->on('regions');
            $table->foreignId('to_country_id');
            $table->foreign('to_country_id')->references('id')->on('countries');
            $table->foreignId('to_city_id');
            $table->foreign('to_city_id')->references('id')->on('cities');
            $table->foreignId('to_region_id');
            $table->foreign('to_region_id')->references('id')->on('regions');
            $table->integer('duration');
            $table->integer('cost');
            $table->boolean('status');
            $table->timestamps();
            $table->unique(['from_country_id', 'from_city_id', 'from_region_id', 'to_country_id', 'to_city_id', 'to_region_id'], 'unique_travel_routes');
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
