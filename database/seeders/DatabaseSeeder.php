<?php

namespace Database\Seeders;

use App\Models\Forum;
use App\Models\Role;
use App\Models\User;
use App\Models\UserStats;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'name' => 'Rocky',
            'email' => 'admin@admin.com',
            'password' => Hash::make('Admin@1234'),
            'email_verified_at' => Carbon::now(),
        ];
        $user = new User();
        $userStored = $user->create($data);

        $role = new Role();
        $roleStored = $role->create(['name' => 'SuperAdministrator']);
        $userStored->assignRole($roleStored);

        $userStats = new UserStats();
        $userStats->addUserStats($userStored->id);

        $forums = new Forum();
        $forums->insert([
            ['title' => 'Ganeral', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "General Discussions", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Gangs Discussions", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Community Events", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Achievements", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Gang Recrutment", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Suggestions", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => 'Actions', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Attackings", 'parent_id' => 8, 'is_cat' => 0],
            ['title' => "Crimes", 'parent_id' => 8, 'is_cat' => 0],
            ['title' => "Missions", 'parent_id' => 8, 'is_cat' => 0],
            ['title' => 'Games', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Gambling", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => "Poker", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => "Russian Roulette", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => "Racing", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => 'Art Work', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Graphics", 'parent_id' => 17, 'is_cat' => 0],
            ['title' => 'Guide', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Question & Answers", 'parent_id' => 19, 'is_cat' => 0],
            ['title' => "Tutorials & Guide", 'parent_id' => 19, 'is_cat' => 0],
            ['title' => "Finance", 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Banking", 'parent_id' => 23, 'is_cat' => 0],
            ['title' => "Stock Market", 'parent_id' => 23, 'is_cat' => 0],
            ['title' => "Trading Post", 'parent_id' => 23, 'is_cat' => 0],
            ['title' => 'Communication', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Discord", 'parent_id' => 26, 'is_cat' => 0],
            ['title' => 'Bug', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Bug & Issues", 'parent_id' => 28, 'is_cat' => 0],
        ]);
    }
}
