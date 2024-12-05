<?php

namespace App\Console\Commands;

use App\Models\Film;
use Illuminate\Console\Command;

class UpdateFilmRatings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:film-ratings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update film ratings based on user reviews';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $films = Film::all();
        foreach ($films as $film) {
            $film->rating_film = $film->averageRating();
            $film->save();
        }
        $this->info('Film ratings updated successfully');
    }
}
