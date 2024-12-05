<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Tentukan kunci cache yang unik
        $cacheKey = 'films_page_' . $request->get('page', 1);
    
        // Gunakan Cache::remember untuk menyimpan hasil query dalam cache
        $films = Cache::remember($cacheKey, 60, function () {
            return Film::with('bookmarks')
                ->where('status', 'accepted')
                ->orderBy('film_id', 'asc') // Tambahkan ini
                ->paginate(8);
        });
    
        $userBookmarks = [];
        if (Auth::check()) {
            $userBookmarks = Auth::user()->bookmarks->pluck('film_id')->toArray(); // Ambil ID film yang di-bookmark oleh user
        }
        return Inertia::render('Home/Home', [
            'films' => $films,
            'userBookmarks' => $userBookmarks,
        ]);
    }
}