<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film; // Sesuaikan dengan model Anda
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Validasi input
        $request->validate([
            'term' => 'required|string|max:255',
            'category' => 'required|string|in:title,actor',
        ]);

        $query = Film::with(['genres', 'actors', 'awards', 'countries'])
            ->where('status', 'accepted'); // Tambahkan kondisi ini

        $searchTerm = strtolower($request->input('term')); // Convert to lowercase
        $category = $request->input('category');

        // Gunakan switch untuk kategori
        switch ($category) {
            case 'title':
                $query->whereRaw('LOWER(title) LIKE ?', ['%' . $searchTerm . '%']);
                break;
            case 'actor':
                $query->whereHas('actors', function($q) use ($searchTerm) {
                    $q->whereRaw('LOWER(actor_name) LIKE ?', ['%' . $searchTerm . '%']);
                });
                break;
        }

        $results = $query->get();

        return Inertia::render('SearchResultPage/SearchResultPage', [
            'film' => $results
        ]);
    }
}