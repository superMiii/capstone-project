<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
        User::factory(5)->create();

        Category::create([
            'category_name' => 'Webinar'
        ]);
        Category::create([
            'category_name' => 'Contest'
        ]);
        Category::create([
            'category_name' => 'Scholarship'
        ]);
        Category::create([
            'category_name' => 'Concert'
        ]);
        Category::create([
            'category_name' => 'Lain-lain'
        ]);

        Event::factory(40)->create();
    }
}
