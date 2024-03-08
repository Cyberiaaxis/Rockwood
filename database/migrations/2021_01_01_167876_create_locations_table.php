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
        Schema::create('locations', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Name of the location (country, region, or city)
            $table->enum('type', ['country', 'region', 'city']); // Type of the location
            $table->integer('parent_id')->nullable(); // Reference to the parent location's ID
            $table->integer('coordinateX'); // X coordinate
            $table->integer('coordinateY'); // Y coordinate
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
        Schema::dropIfExists('locations');
    }
};

