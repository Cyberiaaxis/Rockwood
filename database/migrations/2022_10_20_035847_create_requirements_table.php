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
        Schema::create('requirements', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->decimal('cost', 5,2)->nullable();
            $table->foreignId('item_id')->nullable();
            $table->foreign('item_id')->references('id')->on('items');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requirements');
    }
};

// {requirement|benefit}_to_{item|real_estate}


// CREATE TABLE `requirement_and_effects` (
// 	`id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`type` varchar(255) NOT NULL, (requirement|effect)
// 	`module` varchar(255) NOT NULL, ({stat|item|real_estate)
//     `moduleId` INT NOT NULL, ({item_id|real_estate_id something like this)
//     `effectOn` varchar(255) DEFAULT NULL, (what kind of effect on player)
// 	`effect` INT(11) DEFAULT '0', (could be negative value)
// 	`itemId` INT(11) NOT NULL DEFAULT '0', (if item involvement)
//     `level` INT(11) DEFAULT '0', (player's his level in game)
//     `upgradeStage` INT(11) DEFAULT '0', (next upgrade stage cheacker)
// 	`status` BOOLEAN NOT NULL DEFAULT '0', (disable| enable)
// 	PRIMARY KEY (`id`)
// );
