<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration for creating the 'event_types' table.
 *
 * This table stores different types of events, each identified by a unique name.
 * The 'event_types' table includes a primary key and a unique constraint on the event type name.
 */
return new class extends Migration
{
    /**
     * Run the migrations to create the 'event_types' table.
     *
     * This method defines the schema for the 'event_types' table, including the primary key
     * and a unique column for the event type name. It also includes timestamps for tracking
     * creation and update times.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_types', function (Blueprint $table) {
            $table->id(); // Primary key for the event types
            $table->string('name')->unique(); // Unique name for each event type
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations by dropping the 'event_types' table.
     *
     * This method removes the 'event_types' table and all associated constraints.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_types');
    }
};
