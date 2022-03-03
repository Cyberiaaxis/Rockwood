<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserRealEstatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_real_estates', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('real_estates_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('real_estates_id')->references('id')->on('real_estates');
            $table->primary(['user_id','real_estates_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_real_estates');
    }
}
