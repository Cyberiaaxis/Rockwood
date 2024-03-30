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
        Schema::create('route_requirements_mappings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id');
            $table->foreign('route_id')->references('id')->on('travel_routes')->unique();
            $table->foreignId('item_id');
            $table->foreign('item_id')->references('id')->on('items')->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('route_requirements_mappings');
    }
};
