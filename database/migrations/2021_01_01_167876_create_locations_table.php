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


    /**
     * Reverse the migrations.
     *
     * @return void
     */    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id(); // Unique identifier for each location (primary key)
            $table->string('name'); // Name of the location (country, region, or city)
            $table->enum('type', ['country', 'region', 'city']); // Type of the location (country, region, or city)
            $table->integer('parent_id')->nullable(); // Reference to the parent location's ID (nullable if it's a top-level location)
            $table->string('avatar')->nullable(); // Path to the avatar image (optional)
            $table->text('description')->nullable(); // Description of the location (optional)
            $table->integer('coordinateX'); // X coordinate (numeric value)
            $table->integer('coordinateY'); // Y coordinate (numeric value)
            $table->timestamps(); // Timestamps for record creation and modification
        });
    }
    public function down()
    {
        Schema::dropIfExists('locations');
    }
};

/// https://dbfiddle.uk/ZIj5Z1RG