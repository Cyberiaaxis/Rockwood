<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Name of the location (country, region, or city)
            $table->string('avatar')->nullable(); // Path to the avatar image (optional)
            $table->text('description')->nullable(); // Description of the location (optional)
            $table->integer('coordinateX')->nullable(); // X coordinate (numeric value)
            $table->integer('coordinateY')->nullable(); // Y coordinate (numeric value)
            $table->timestamps(); // Timestamps for record creation and modification
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
