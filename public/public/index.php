<?php
declare(strict_types=1);

use Pimple\Container;

require '../vendor/autoload.php';

/**
 * (1) Define Classes
 */
class Sword {
    private int $damage = 1;

    public function __construct(int $damage) {
        $this->damage = $damage;
    }

    public function getDamage(): int {
        return $this->damage;
    }
}

class Warrior {
    private $weapon;

    public function __construct($weapon) {
        $this->weapon = $weapon;
    }

    public function attack() {
        return $this->weapon->getDamage();
    }
}


/**
 * (2) Configure your service container
 */
$container = new Container();

// configure the sword object
$container['sword'] = function($c) {
    return new Sword(random_int(1, 5));
};

// configure the warrior object
$container['warrior'] = function($c) {
    // add the above sword object, to the warrior object
    return new Warrior($c['sword']);
};


/**
 * (3) Now we use the service Container to create the warrior object, with their
 * dependencies.
 */
$warrior = $container['warrior'];

$damage = $warrior->attack();

echo "The warrior dealt $damage damage to their enemy!";
