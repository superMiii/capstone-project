<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'picture' => $this->faker->imageUrl(360, 360, 'user', true, 'profile', true),
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('supermi'),
            'role' => $this->faker->randomElement(['admin', 'user']),
        ];
    }
}
