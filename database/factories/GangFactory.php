<?php

namespace Database\Factories;

use App\Models\Gang;
use Illuminate\Database\Eloquent\Factories\Factory;

class GangFactory extends Factory
{
    protected $model = Gang::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'image' => $this->faker->imageUrl,
        ];
    }
}
