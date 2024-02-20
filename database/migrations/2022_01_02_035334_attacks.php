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
            $table->bigInteger('attacks')->default(0);
            $table->bigInteger('attacks_success')->default(0);
            $table->bigInteger('defenses')->default(0);
            $table->bigInteger('defenses_success')->default(0);
            $table->bigInteger('settlement_attacker')->default(0);
            $table->bigInteger('settlement_defender')->default(0);
            $table->bigInteger('escaped_attacker')->default(0);
            $table->bigInteger('escaped_defender')->default(0);
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
