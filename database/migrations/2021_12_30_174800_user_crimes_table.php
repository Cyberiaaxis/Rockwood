<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserCrimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_crimes', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->integer('crime_id')->default(0);
            $table->integer('success')->default(0);
            $table->integer('fail')->default(0);
            $table->foreign('user_id')->references('id')->on('users');
            $table->primary(['user_id', 'crime_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_crimes');
    }
}
