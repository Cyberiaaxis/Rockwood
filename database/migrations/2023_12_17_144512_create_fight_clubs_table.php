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
        Schema::create('fight_clubs', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->nullable();
            $table->string('bgimage')->nullable();
            $table->string('clubName');
            $table->integer('area_id')->nullable();           // $table->foreignId('city_id')->default(1);
            // $table->foreign('city_id')->references('id')->on('cities');
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
        Schema::dropIfExists('fight_clubs');
    }
};
