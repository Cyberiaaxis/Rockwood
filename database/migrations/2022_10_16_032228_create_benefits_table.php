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
        // Schema::create('benefits', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('type'); //dropdown
        //     $table->decimal('cost', 5,2)->nullable();
        //     $table->foreignId('item_id')->nullable();
        //     $table->foreign('item_id')->references('id')->on('items');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('real_estate_addons');
    }
};
