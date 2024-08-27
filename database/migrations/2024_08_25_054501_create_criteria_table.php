<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration for creating the 'criteria' table.
 *
 * This table stores different criteria that can be used for awards, rewards, honors,
 * or other event types. Each criterion can have associated thresholds and descriptions.
 */
class CreateCriteriaTable extends Migration
{
    /**
     * Run the migrations to create the 'criteria' table.
     *
     * This method defines the schema for the 'criteria' table, including columns for 
     * criterion details, associated foreign keys, and unique constraints.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteria', function (Blueprint $table) {
            $table->id(); // Primary key for the criteria

            $table->string('name'); // Name of the criterion
            $table->text('description')->nullable(); // Description of the criterion, can be null
            $table->enum('event_type', ['Battle', 'Crime', 'Travel', 'Missions', 'Custom']); // Type of event

            // Nullable foreign keys with improved naming
            $table->unsignedBigInteger('award_id')->nullable(); // Foreign key for associated award
            $table->unsignedBigInteger('reward_id')->nullable(); // Foreign key for associated reward
            $table->unsignedBigInteger('honor_id')->nullable(); // Foreign key for associated honor

            // Define foreign key constraints
            $table->foreign('award_id')
                ->references('id')
                ->on('awards')
                ->onDelete('set null');

            $table->foreign('reward_id')
                ->references('id')
                ->on('rewards')
                ->onDelete('set null');

            $table->foreign('honor_id')
                ->references('id')
                ->on('honors')
                ->onDelete('set null');

            // Threshold columns with improved naming
            $table->string('threshold_type')->nullable(); // Type of threshold (e.g., 'min_battles_won')
            $table->integer('threshold_value')->nullable(); // Value for the threshold

            $table->timestamps(); // Timestamps for created_at and updated_at

            // Unique constraint to ensure that each event type is unique within the context of foreign keys
            $table->unique(['event_type', 'award_id', 'reward_id', 'honor_id']);
        });
    }

    /**
     * Reverse the migrations by dropping the 'criteria' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criteria');
    }
}
