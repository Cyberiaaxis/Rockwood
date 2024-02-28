<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_course_history', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('course_id');
            $table->date('completion_date')->nullable();
            $table->unsignedInteger('grade')->nullable(); // Change the data type to unsigned integer
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->primary(['user_id','course_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_course_history');
    }
}
