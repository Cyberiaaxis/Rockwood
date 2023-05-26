<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        // Schema::create('real_estate_management', function (Blueprint $table) {
        //     $table->foreignId('real_id');
        //     $table->foreignId('ben_id')->nullable();
        //     $table->foreignId('req_id')->nullable();
        //     $table->foreignId('addon_id')->nullable();
        //     $table->foreign('real_id')->references('id')->on('real_estates');
        //     $table->foreign('ben_id')->references('id')->on('benefits');
        //     $table->foreign('req_id')->references('id')->on('requirements');
        //     $table->foreign('addon_id')->references('id')->on('addons');
        //     $table->boolean('status')->default(0);
        //     $table->timestamps();
        //     $table->unique(['real_id', 'ben_id', 'req_id', 'addon_id']);
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('real_estate_management');
    }
};
