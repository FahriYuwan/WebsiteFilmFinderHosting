<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Film;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DetailPageController extends Controller
{
    public function show($film_id)
    {
        // Ambil data film langsung dari database tanpa cache
        $film = Film::with([
            'genres', 
            'actors', 
            'awards', 
            'reviews' => function ($query) {
                $query->where('status', 'accepted')->with('user');
            }, 
            'countries', 
            'bookmarks'
        ])->findOrFail($film_id);

        $userBookmarks = [];
        if (Auth::check()) {
            $userBookmarks = Auth::user()->bookmarks->pluck('film_id')->toArray(); // Ambil ID film yang di-bookmark oleh user
        }
        return Inertia::render('DetailPage/DetailPage', [
            'film' => $film,
            'userBookmarks' => $userBookmarks
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'film_id' => 'required|integer|exists:films,film_id',
            'rating_user' => 'required|numeric|min:1|max:5',
            'review_text' => 'required|string|max:255',
        ]);

        $film = Film::findOrFail($request->film_id);

        $review = $film->reviews()->create([
            'rating_user' => $request->rating_user,
            'review_text' => $request->review_text,
            'review_date' => now(),
            'user_id' => Auth::id(),
            'status' => 'pending'
        ]);

        // Update film rating only if the review status is 'accepted'
        if ($review->status === 'accepted') {
            $this->updateFilmRating($film);
        }

        return back()->with('success', 'Review submitted successfully!');
    }

    // Tambahkan method untuk menghitung rata-rata rating film
    protected function updateFilmRating(Film $film)
    {
        // Hitung rata-rata rating dari review yang ada
        $averageRating = $film->reviews()->avg('rating_user');

        // Update rating_film dengan rata-rata yang baru
        $film->update([
            'rating_film' => round($averageRating, 1)
        ]);
    }

    public function bookmark(Request $request)
    {
        $request->validate([
            'film_id' => 'required|integer|exists:films,film_id'
        ]);

        $film = Film::findOrFail($request->film_id);

        $film->bookmarks()->syncWithoutDetaching(Auth::id());

        return back()->with('success', 'Film bookmarked successfully!');
    }
}