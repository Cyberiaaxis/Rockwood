<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration for creating the 'thresholds' table.
 *
 * This table stores different thresholds associated with specific criteria.
 * Each threshold is linked to a criterion and has a type and value.
 */
class CreateThresholdsTable extends Migration
{
    /**
     * Run the migrations to create the 'thresholds' table.
     *
     * This method defines the schema for the 'thresholds' table, including columns for
     * criterion reference, threshold type, and value. It also sets up foreign key constraints,
     * indexing, and unique constraints.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thresholds', function (Blueprint $table) {
            $table->id(); // Primary key for the thresholds

            $table->unsignedBigInteger('criteria_id'); // Foreign key referencing the 'criteria' table
            $table->string('threshold_type'); // Type of threshold (e.g., 'min_battles_won')
            $table->integer('threshold_value'); // Value for the threshold
            $table->timestamps(); // Timestamps for created_at and updated_at

            // Define foreign key constraint
            $table->foreign('criteria_id')
                ->references('id')
                ->on('criteria')
                ->onDelete('cascade'); // Automatically delete thresholds when the associated criterion is deleted

            // Index for criteria_id to improve query performance
            $table->index('criteria_id');

            // Unique constraint to ensure that each criterion has a unique threshold type
            $table->unique(['criteria_id', 'threshold_type']);
        });
    }

    /**
     * Reverse the migrations by dropping the 'thresholds' table.
     *
     * This method removes the 'thresholds' table and all associated constraints.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('thresholds');
    }
}
