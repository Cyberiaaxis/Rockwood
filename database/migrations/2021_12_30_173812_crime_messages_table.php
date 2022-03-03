<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrimeMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crime_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('message_type');
            $table->longText('message');
            $table->foreignId('crime_id');
            $table->foreign('crime_id')->references('id')->on('crimes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crime_messages');
    }
}
