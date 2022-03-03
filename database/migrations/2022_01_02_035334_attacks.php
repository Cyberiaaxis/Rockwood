<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Attacks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attacks', function (Blueprint $table) {
            $table->foreignId('user_id')->unique();
            $table->foreign('user_id')->references('id')->on('users');
            $table->bigInteger('attacks');
            $table->bigInteger('attacks_success');
            $table->bigInteger('defenses_success');
            $table->bigInteger('settlement_attacker');
            $table->bigInteger('settlement_defender');
            $table->bigInteger('escaped_attacker');
            $table->bigInteger('escaped_defender');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attacks');
    }
}
