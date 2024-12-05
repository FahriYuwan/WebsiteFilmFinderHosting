<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\Countries;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\Film;
use App\Models\Review;

class CMSReviewsController extends Controller{
    public function index()
    {
        $reviews = Review::with([
            'film' => function ($query) {
                $query->select('film_id', 'title'); // Pastikan untuk menyertakan 'id' karena itu adalah kunci asing
            },
            'user' => function ($query) {
                $query->select('user_id', 'name'); // Pastikan untuk menyertakan 'id' karena itu adalah kunci asing
            }
        ])->get();
    
        return Inertia::render('CMS/CMSReviews/CMSReviews', [
            'reviews' => $reviews
        ]);
    }

    // public function update(Request $request){
    //     $review_array = $request->review_id;
    //     Review::whereIn('review_id', $review_array)->update(['status' => 'approved']);
    //     return redirect()->route('cms.reviews.index');
    // }

    // public function destroy(Request $request){
    //     $review_array = $request->review_id;
    //     Review::whereIn('review_id', $review_array)->delete();
    //     return redirect()->route('cms.reviews.index');
    // }

    public function update(Request $request)
    {
        $reviewIds = $request->review_id;
        $reviews = Review::whereIn('review_id', $reviewIds)->get();

        // Update status to 'accepted'
        Review::whereIn('review_id', $reviewIds)->update(['status' => 'accepted']);

        // Get unique film IDs associated with the reviews
        $filmIds = $reviews->pluck('film_id')->unique();
        Log::info('Films to update:', $filmIds->toArray());

        // Update film ratings
        foreach ($filmIds as $filmId) {
            $film = Film::find($filmId);
            if ($film) {
                $this->updateFilmRating($film);
            } else {
                Log::warning("Film with ID {$filmId} not found.");
            }
        }

        return redirect()->route('cms.reviews.index')->with('success', 'Reviews updated successfully!');
    }

    public function destroy(Request $request)
    {
        $reviewIds = $request->review_id;
        $reviews = Review::whereIn('review_id', $reviewIds)->get();

        // Delete reviews
        Review::whereIn('review_id', $reviewIds)->delete();

        // Get unique film IDs associated with the deleted reviews
        $filmIds = $reviews->pluck('film_id')->unique();
        Log::info('Films to update after deletion:', $filmIds->toArray());

        // Update film ratings
        foreach ($filmIds as $filmId) {
            $film = Film::find($filmId);
            if ($film) {
                $this->updateFilmRating($film);
            } else {
                Log::warning("Film with ID {$filmId} not found.");
            }
        }

        return redirect()->route('cms.reviews.index')->with('success', 'Reviews deleted successfully!');
    }

    protected function updateFilmRating(Film $film)
    {
        // Hitung rata-rata rating dari review yang 'accepted'
        $averageRating = $film->reviews()
                              ->where('status', 'accepted')
                              ->avg('rating_user');

        Log::info("Updating Film ID {$film->film_id} with average rating: {$averageRating}");

        // Update rating_film dengan rata-rata yang baru
        $film->update([
            'rating_film' => round($averageRating, 1)
        ]);

        Log::info("Film ID {$film->film_id} rating_film updated to: " . round($averageRating, 1));
    }
    
}