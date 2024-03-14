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
        Schema::create('route_requirements_mappings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->constrained('travel_routes')->unique();
            $table->string('requirement_type')->unique(); // e.g., 'visa', 'passport', etc.
            $table->integer('requirement_id')->unique();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('route_requirements_mappings');
    }
};
