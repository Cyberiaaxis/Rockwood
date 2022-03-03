<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GangMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gang_members', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('gang_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('gang_id')->references('id')->on('gangs');
            $table->primary(['user_id', 'gang_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gang_members');
    }
}
