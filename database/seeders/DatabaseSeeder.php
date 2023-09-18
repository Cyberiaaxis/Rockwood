<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
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
            'email' => 'cybertaaxis13r6432@gmail.com',
            'password' => Hash::make('Admin@1234'),
        ];
        $user = new User();
        $userStored = $user->create($data);

        $role = new Role();
        $roleStored = $role->create(['name' => 'SubSuperAdmini']);
        $userStored->assignRole($roleStored);
    }
}
