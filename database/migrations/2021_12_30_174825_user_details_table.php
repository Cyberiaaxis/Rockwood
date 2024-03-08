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
            $table->timestamp('jail')->nullable();
            $table->timestamp('hospital')->nullable();
            $table->bigInteger('money')->default(0);
            $table->bigInteger('points')->default(0);
            $table->bigInteger('rates')->default(0);
            $table->integer('forum_rank_id')->nullable();
            $table->bigInteger('rank_id')->default(1);
            $table->integer('realestate_id')->default(1);
            $table->integer('level_id')->default(1);
            $table->integer('travel_route_id')->default(1);
            $table->bigInteger('gang_id')->nullable();
            $table->integer('active_course')->nullable();
            $table->timestamp('course_started')->nullable();
            $table->integer('current_job')->nullable();
            $table->integer('location_id')->default(1);
            $table->timestamp('job_started')->nullable();
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
