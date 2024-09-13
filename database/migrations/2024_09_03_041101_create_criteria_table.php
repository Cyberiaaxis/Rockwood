<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateCriteriaTable
 *
 * Migration to create the 'criteria' table. This table stores the criteria
 * used in the application, including information about event types, awards, rewards,
 * honors, and sequence for processing criteria.
 *
 * @package App\Migrations
 */
class CreateCriteriaTable extends Migration
{
    /**
     * Run the migrations to create the 'criteria' table.
     *
     * This method creates the 'criteria' table with fields for name, description,
     * foreign keys referencing other tables, and a self-referencing field for
     * sequencing criteria. It also sets constraints to manage the integrity
     * of the data.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteria', function (Blueprint $table) {
            // Create primary key for the criteria
            $table->id(); // Auto-incrementing ID

            // Basic fields
            $table->string('name'); // Name of the criterion
            $table->text('description')->nullable(); // Optional description of the criterion

            // Foreign key referencing the 'event_types' table
            $table->foreignId('event_type_id')
                ->constrained('event_types') // Constrained to the 'event_types' table's primary key
                ->onDelete('cascade'); // Delete criteria when the associated event type is deleted

            // Foreign key referencing the 'cities' table, nullable
            $table->foreignId('from_city_id')
                ->nullable() // Allows null values if the criterion is not associated with a city
                ->constrained('cities') // Constrained to the 'cities' table's primary key
                ->onDelete('set null'); // Set city to null if the referenced city is deleted

            // Nullable foreign keys referencing 'awards', 'rewards', and 'honors' tables
            $table->foreignId('award_id')
                ->nullable() // Allows null values if the criterion does not have an associated award
                ->constrained('awards') // Constrained to the 'awards' table's primary key
                ->onDelete('set null'); // Set award to null if the referenced award is deleted

            $table->foreignId('reward_id')
                ->nullable() // Allows null values if the criterion does not have an associated reward
                ->constrained('rewards') // Constrained to the 'rewards' table's primary key
                ->onDelete('set null'); // Set reward to null if the referenced reward is deleted

            $table->foreignId('honor_id')
                ->nullable() // Allows null values if the criterion does not have an associated honor
                ->constrained('honors') // Constrained to the 'honors' table's primary key
                ->onDelete('set null'); // Set honor to null if the referenced honor is deleted

            // Self-referencing foreign key for sequencing criteria
            $table->foreignId('next_criteria_id')
                ->nullable() // Allows null values if this is the last criterion in the sequence
                ->constrained('criteria') // Constrained to the 'criteria' table's primary key
                ->onDelete('set null'); // Set next criterion to null if the referenced criterion is deleted

            // Timestamps for created_at and updated_at fields
            $table->timestamps();

            // Unique constraint to ensure the combination of event_type_id, award_id, reward_id, and honor_id is unique
            $table->unique(['event_type_id', 'award_id', 'reward_id', 'honor_id']);

            // Index for optimizing queries involving next_criteria_id
            $table->index('next_criteria_id');
        });
    }

    /**
     * Reverse the migrations by dropping the 'criteria' table.
     *
     * This method drops the 'criteria' table if it exists, effectively
     * undoing the migration created in the up() method.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criteria');
    }
}
