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
    // public function up()
    // {
    //     Schema::create('requirements_and_effects', function (Blueprint $table) {
    //         $table->id();
    //         $table->string('type')->unique();
    //         $table->string('module')->unique();
    //         $table->integer('moduleId')->unique();
    //         $table->integer('effectOn')->nullable()->unique();
    //         $table->string('effect')->nullable()->unique();
    //         $table->foreignId('itemId')->nullable()->unique();
    //         $table->foreign('itemId')->references('id')->on('items');
    //         $table->integer('level')->nullable()->unique();
    //         $table->integer('upgradeStage')->unique();
    //         $table->integer('status')->default(0);
    //         $table->timestamps();
    //     });
    // }

    // /**
    //  * Reverse the migrations.
    //  *
    //  * @return void
    //  */
    // public function down()
    // {
    //     Schema::dropIfExists('requirements_and_effects');
    // }
};
