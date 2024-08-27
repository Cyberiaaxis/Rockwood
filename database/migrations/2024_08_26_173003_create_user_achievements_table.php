<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration for creating the 'user_achievements' table.
 *
 * This table tracks achievements for users, including the type of achievement,
 * associated achievement ID, date, description, and progress.
 */
class CreateUserAchievementsTable extends Migration
{
    /**
     * Run the migrations to create the 'user_achievements' table.
     *
     * This method defines the schema for the 'user_achievements' table, including
     * columns for user ID, achievement type, associated achievement ID, date, 
     * description, progress, and timestamps.
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

            // Type of achievement
            $table->enum('achievement_type', ['reward', 'award', 'honor']);

            // ID of the specific achievement
            $table->unsignedBigInteger('achievement_id'); // Use unsignedBigInteger for consistency with typical ID columns

            // Date when the achievement was received
            $table->timestamp('achievement_date')
                ->useCurrent(); // Set to current timestamp by default

            // Description of the achievement
            $table->text('description')
                ->nullable(); // Allows for optional descriptions

            // Progress made towards the achievement
            $table->integer('progress')
                ->default(0); // Default progress value is 0

            // Timestamps for record creation and updates
            $table->timestamps();

            // Unique constraint to ensure that each combination of user, achievement type, and achievement ID is unique
            $table->unique(['user_id', 'achievement_type', 'achievement_id']);
        });
    }

    /**
     * Reverse the migrations by dropping the 'user_achievements' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_achievements');
    }
}
