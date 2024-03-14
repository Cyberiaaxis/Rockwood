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
        Schema::create('item_attribute_effects', function (Blueprint $table) {
            $table->foreignId('effect_id');
            $table->foreign('effect_id')->references('id')->on('item_effects');
            $table->foreignId('attribute_id');
            $table->foreign('attribute_id')->references('id')->on('item_attributes');
            $table->decimal('effect_value', 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_attribute_effects');
    }
};
