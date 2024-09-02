<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateUserAchievementsTable
 *
 * This migration creates the 'user_achievements' table which tracks user achievements.
 * The table includes columns for user ID, achievement ID, date when the achievement was received,
 * a description, progress, and timestamps for record creation and updates.
 *
 * @package App\Migrations
 */
class CreateUserAchievementsTable extends Migration
{
    /**
     * Run the migrations to create the 'user_achievements' table.
     *
     * This method defines the schema for the 'user_achievements' table. It includes columns for:
     * - `id`: The primary key for the table.
     * - `user_id`: A foreign key that references the 'users' table. It is set to cascade on delete.
     * - `achievement_id`: A foreign key that references the 'criteria' table. It is set to cascade on delete.
     * - `achievement_date`: The timestamp indicating when the achievement was received. Defaults to the current timestamp.
     * - `description`: A text field for an optional description of the achievement.
     * - `progress`: An integer indicating the progress made towards the achievement. Defaults to 0.
     * - `created_at` and `updated_at`: Timestamps for when the record was created and last updated.
     *
     * Additionally, a unique constraint is applied to the combination of `user_id` and `achievement_id`
     * to ensure that each combination is unique within the table.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_achievements', function (Blueprint $table) {
            $table->id(); // Primary key for the user achievements record

            // Foreign key referencing the users table
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade'); // Delete user achievements if the user is deleted

            // Foreign key referencing the criteria table for the specific achievement
            $table->foreignId('achievement_id')
                ->constrained('criteria')
                ->onDelete('cascade'); // Delete achievements if the referenced criteria is deleted

            // Timestamp for when the achievement was received
            $table->timestamp('achievement_date')
                ->useCurrent(); // Default to the current timestamp

            // Optional description of the achievement
            $table->text('description')
                ->nullable(); // Allows for an optional description

            // Progress made towards the achievement
            $table->integer('progress')
                ->default(0); // Default progress value is 0

            // Timestamps for record creation and updates
            $table->timestamps();

            // Unique constraint to ensure unique combinations of user and achievement ID
            $table->unique(['user_id', 'achievement_id']);
        });
    }

    /**
     * Reverse the migrations by dropping the 'user_achievements' table.
     *
     * This method reverts the database schema to its previous state by dropping the 'user_achievements' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_achievements');
    }
}
