<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
     if (DB::table('roles')->count() === 0) {
         $this->call(RoleSeeder::class);
     }
     if (DB::table('users')->count() === 0) {
         $this->call(UserSeeder::class);
     }
    }
}

// public function run()
// {
//     // Menjalankan UsersTableSeeder jika tabel users kosong
//     if (DB::table('users')->count() === 0) {
//         $this->call(UsersTableSeeder::class);
//     }

//     // Menjalankan seeder lain yang mungkin tergantung
//     if (DB::table('posts')->count() === 0) {
//         $this->call(PostsTableSeeder::class);
//     }
// }

