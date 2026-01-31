<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::truncate();

        User::create([
            'name' => 'Instructor One',
            'email' => 'instructor@test.com',
            'password' => Hash::make('password'),
            'role' => 'instructor',
        ]);

        User::create([
            'name' => 'Student One',
            'email' => 'student@test.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
    }
}