<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCriteriaTable extends Migration
{
    public function up()
    {
        Schema::create('criteria', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Name of the criteria
            $table->text('description')->nullable(); // Description of the criteria
            $table->enum('type', ['Battle', 'Crime', 'Travel', 'Missions', 'Custom']); // Type of criteria

            // Nullable foreign keys
            $table->unsignedBigInteger('award_id')->nullable(); // Foreign key for Award
            $table->unsignedBigInteger('reward_id')->nullable(); // Foreign key for Reward
            $table->unsignedBigInteger('honor_id')->nullable(); // Foreign key for Honor

            // Set foreign key constraints
            $table->foreign('award_id')->references('id')->on('awards')->onDelete('set null');
            $table->foreign('reward_id')->references('id')->on('rewards')->onDelete('set null');
            $table->foreign('honor_id')->references('id')->on('honors')->onDelete('set null');

            // Threshold columns
            $table->string('threshold_type')->nullable(); // Type of threshold (e.g., 'min_battles_won', 'min_hp_remaining')
            $table->integer('threshold_value')->nullable(); // Value of the threshold

            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('criteria');
    }
}
