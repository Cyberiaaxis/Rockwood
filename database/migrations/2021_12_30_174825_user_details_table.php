<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamp('jail');
            $table->timestamp('hospital');
            $table->bigInteger('money');
            $table->bigInteger('points');
            $table->bigInteger('rates');
            $table->integer('forum_rank_id');
            $table->bigInteger('rank_id');
            $table->integer('level_id');
            $table->integer('location_id');
            $table->bigInteger('gang_id');
            $table->integer('active_course');
            $table->timestamp('course_started');
            $table->integer('current_job');
            $table->timestamp('job_started');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_details');
    }
}
