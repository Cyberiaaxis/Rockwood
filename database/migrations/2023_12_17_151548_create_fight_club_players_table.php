<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fight_club_players', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('fight_club__id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('fight_club__id')->references('id')->on('fight_clubs');
            $table->primary(['user_id', 'fight_club__id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fight_club_players');
    }
};
