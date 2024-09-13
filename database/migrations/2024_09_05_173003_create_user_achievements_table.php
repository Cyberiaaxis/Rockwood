<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration class for creating the 'user_achievements' table.
 *
 * This migration creates the 'user_achievements' table, which tracks achievements earned by users.
 * The table includes details about each achievement, such as the user who earned it, the criteria associated with it,
 * and additional information to support future queries.
 *
 * The table schema includes:
 * - `id`: The primary key of the table.
 * - `user_id`: Foreign key referencing the 'users' table. Deleting a user will cascade and remove related achievements.
 * - `achievement_id`: Foreign key referencing the 'criteria' table. Deleting a criterion will cascade and remove related achievements.
 * - `achievement_date`: Timestamp indicating when the achievement was earned. This column is required.
 * - `last_achieved`: Boolean indicating if this achievement is the most recent one for the user. Defaults to `false`.
 * - `next_criteria_id`: Optional foreign key referencing the 'criteria' table, indicating the next stage or criteria.
 *
 * A unique constraint is applied to the combination of `user_id` and `achievement_id` to ensure each achievement 
 * is recorded only once per user.
 *
 * @package Database\Migrations
 */
class CreateUserAchievementsTable extends Migration
{
    /**
     * Run the migrations to create the 'user_achievements' table.
     *
     * This method defines the schema for the 'user_achievements' table:
     * - Creates `id` as the primary key.
     * - Sets up `user_id` as a foreign key referencing the 'users' table, with cascading delete on user removal.
     * - Sets up `achievement_id` as a foreign key referencing the 'criteria' table, with cascading delete on criterion removal.
     * - Adds `achievement_date` as a required timestamp.
     * - Adds `last_achieved` as a boolean with a default value of `false`.
     * - Adds `next_criteria_id` as an optional foreign key referencing the 'criteria' table.
     * - Applies a unique constraint on the combination of `user_id` and `achievement_id`.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_achievements', function (Blueprint $table) {
            $table->id(); // Primary key for the table

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade'); // Foreign key referencing 'users' table, with cascading delete

            $table->foreignId('achievement_id')
                ->constrained('criteria')
                ->onDelete('cascade'); // Foreign key referencing 'criteria' table, with cascading delete

            $table->timestamp('achievement_date'); // Timestamp for when the achievement was received, required

            $table->boolean('last_achieved')->default(false); // Boolean to indicate if this achievement is the most recent one

            $table->unique(['user_id', 'achievement_id']); // Unique constraint for user_id and achievement_id

            // Optional indexes for performance improvement
            $table->index('user_id');
            $table->index('achievement_id');
        });
    }

    /**
     * Reverse the migrations by dropping the 'user_achievements' table.
     *
     * This method reverts the changes made by the `up` method by dropping the 'user_achievements' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_achievements');
    }
}
