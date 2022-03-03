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
            $table->foreignId('crime_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('crime_id')->references('id')->on('crimes');
            $table->primary(['user_id','crime_id']);
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
