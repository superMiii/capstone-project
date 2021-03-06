<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(mt_rand(2, 5)),
            'poster' => $this->faker->imageUrl(360, 360, 'events', true, 'image', true),
            'time' => $this->faker->time(),
            'place' => $this->faker->streetName(),
            'date' => $this->faker->date('Y-m-d'),
            'register_link' => $this->faker->url(),
            'ticket_price' => $this->faker->randomNumber(5, true),
            'status' => $this->faker->randomElement(['approved', 'not approved', 'waiting']),
            'category_id' => mt_rand(1, 5),
            'user_id' => mt_rand(1, 5)
        ];
    }
}
