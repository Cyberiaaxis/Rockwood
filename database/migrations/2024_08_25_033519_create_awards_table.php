<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration for creating the 'awards' table.
 *
 * This table stores information about awards, including their name, description,
 * and timestamps for record creation and updates.
 */
class CreateAwardsTable extends Migration
{
    /**
     * Run the migrations to create the 'awards' table.
     *
     * This method defines the schema for the 'awards' table, including columns for
     * the award's name, description, and timestamps for record creation and updates.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('awards', function (Blueprint $table) {
            $table->id(); // Primary key for the awards record

            $table->string('name'); // Name of the award
            $table->text('description')->nullable(); // Optional description of the award

            $table->timestamps(); // Created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations by dropping the 'awards' table.
     *
     * This method removes the 'awards' table and all its columns from the database.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('awards');
    }
}
