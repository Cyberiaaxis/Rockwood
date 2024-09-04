<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateCriteriaTable
 *
 * Migration for creating the 'criteria' table.
 *
 * The 'criteria' table is used to store various criteria associated with awards, rewards, honors, 
 * or other event types. Each record in this table represents a criterion with details about 
 * the criterion itself, its associated event type, and optional associations with awards, rewards, 
 * and honors. The table also includes fields to manage the relationship with the city of origin 
 * and the stage required for the criterion.
 *
 * @package App\Migrations
 */
class CreateCriteriaTable extends Migration
{
    /**
     * Run the migrations to create the 'criteria' table.
     *
     * This method defines the schema for the 'criteria' table. The table includes columns for:
     * - `id`: Primary key for the criteria.
     * - `name`: Name of the criterion.
     * - `description`: A textual description of the criterion. Can be null.
     * - `event_type_id`: Foreign key that references the 'event_types' table. If an event type 
     *   is deleted, all associated criteria are automatically deleted.
     * - `from_city_id`: Foreign key that references the 'cities' table. If the referenced city 
     *   is deleted, this field is set to null.
     * - `award_id`: Nullable foreign key that references the 'awards' table. If the referenced 
     *   award is deleted, this field is set to null.
     * - `reward_id`: Nullable foreign key that references the 'rewards' table. If the referenced 
     *   reward is deleted, this field is set to null.
     * - `honor_id`: Nullable foreign key that references the 'honors' table. If the referenced 
     *   honor is deleted, this field is set to null.
     * - `require_stage`: Integer representing the stage required for the criterion. Defaults to 0.
     * - `created_at` and `updated_at`: Timestamps for record creation and last update.
     *
     * Additionally, a unique constraint ensures that each combination of `event_type_id`, `award_id`, 
     * `reward_id`, and `honor_id` is unique within the table.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteria', function (Blueprint $table) {
            $table->id(); // Primary key for the criteria

            $table->string('name'); // Name of the criterion
            $table->text('description')->nullable(); // Description of the criterion, which can be null

            // Foreign key for event type
            $table->foreignId('event_type_id')
                ->constrained('event_types')
                ->onDelete('cascade'); // Deletes criteria when the associated event type is deleted

            // Foreign key for the city from which the criterion originates
            $table->foreignId('from_city_id')
                ->constrained('cities'); // Set city to null if the referenced city is deleted

            // Nullable foreign keys for associated awards, rewards, and honors
            $table->foreignId('award_id')->nullable()
                ->constrained('awards')
                ->onDelete('set null'); // Set award to null if the referenced award is deleted

            $table->foreignId('reward_id')->nullable()
                ->constrained('rewards')
                ->onDelete('set null'); // Set reward to null if the referenced reward is deleted

            $table->foreignId('honor_id')->nullable()
                ->constrained('honors')
                ->onDelete('set null'); // Set honor to null if the referenced honor is deleted

            $table->integer('require_stage')
                ->default(0); // Stage required for the criterion, default is 0

            $table->timestamps(); // Timestamps for created_at and updated_at

            // Unique constraint to ensure each combination of event_type_id, award_id, reward_id, and honor_id is unique
            $table->unique(['event_type_id', 'award_id', 'reward_id', 'honor_id']);
        });
    }

    /**
     * Reverse the migrations by dropping the 'criteria' table.
     *
     * This method removes the 'criteria' table and all associated constraints. It is useful for 
     * rolling back migrations or resetting the database schema to its previous state.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criteria');
    }
}
