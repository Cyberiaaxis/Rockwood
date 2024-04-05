<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_transportations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id');
            $table->foreign('route_id')->references('id')->on('travel_routes')->unique();
            $table->foreignId('transportation_type_id');
            $table->foreign('transportation_type_id')->references('id')->on('transportation_types')->unique();
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
        Schema::dropIfExists('route_transportations');
    }
};
