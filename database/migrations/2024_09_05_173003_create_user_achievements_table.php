<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration class for creating the 'user_achievements' table.
 *
 * This migration creates the 'user_achievements' table which tracks user achievements.
 * The table includes columns for user ID, achievement ID, the date when the achievement was received,
 * an optional description, progress, and timestamps for record creation and updates.
 */
class CreateUserAchievementsTable extends Migration
{
    /**
     * Run the migrations to create the 'user_achievements' table.
     *
     * Defines the schema for the 'user_achievements' table with the following columns:
     * - `id`: Primary key of the table.
     * - `user_id`: Foreign key referencing the 'users' table, with a cascade on delete.
     * - `achievement_id`: Foreign key referencing the 'criteria' table, with a cascade on delete.
     * - `achievement_date`: Timestamp indicating when the achievement was received, defaulting to the current timestamp.
     * - `description`: Optional text field for a description of the achievement.
     * - `progress`: Integer indicating progress towards the achievement, defaulting to 0.
     * - `achieved_stage`: Integer indicating the achieved stage, defaulting to 0.
     * - `created_at` and `updated_at`: Timestamps for record creation and updates.
     *
     * Additionally, a unique constraint is applied to the combination of `user_id` and `achievement_id`
     * to ensure each combination is unique within the table.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_achievements', function (Blueprint $table) {
            $table->id(); // Primary key for the table

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade'); // Foreign key referencing 'users' table with cascade on delete

            $table->foreignId('achievement_id')
                ->constrained('criteria')
                ->onDelete('cascade'); // Foreign key referencing 'criteria' table with cascade on delete

            $table->timestamp('achievement_date')
                ->useCurrent(); // Timestamp for when the achievement was received, defaulting to the current timestamp

            $table->integer('progress')
                ->default(0); // Progress made towards the achievement, default is 0

            $table->integer('last_achieved_stage')
                ->default(0); // Achieved stage, default is 0

            $table->timestamps(); // Timestamps for creation and updates

            $table->unique(['user_id', 'achievement_id']); // Unique constraint for user_id and achievement_id
        });
    }

    /**
     * Reverse the migrations by dropping the 'user_achievements' table.
     *
     * Reverts the database schema by removing the 'user_achievements' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_achievements');
    }
}
