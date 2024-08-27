<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration for creating the 'honors' table.
 *
 * This table stores information about honors, including their name, description,
 * and timestamps for creation and updates.
 */
class CreateHonorsTable extends Migration
{
    /**
     * Run the migrations to create the 'honors' table.
     *
     * This method defines the schema for the 'honors' table, including columns for
     * the honor's name, description, and timestamps for record creation and updates.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('honors', function (Blueprint $table) {
            $table->id(); // Primary key for the honors record

            $table->string('name'); // Name of the honor
            $table->text('description')->nullable(); // Optional description of the honor

            $table->timestamps(); // Created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations by dropping the 'honors' table.
     *
     * This method removes the 'honors' table and all its columns from the database.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('honors');
    }
}
