<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CMSGenresController extends Controller{
    public function index(Request $request)
    {
        $genres = Genre::orderBy('genre_id', 'desc')->get();
        return Inertia::render('CMS/CMSGenres/CMSGenres', [
            'genres' => $genres,
        ]);
    }

    public function show($genre_id)
    {
        $genre = Genre::findOrFail($genre_id);
        return Inertia::render('CMS/CMSGenres/CMSGenres', [
            'genre' => $genre,
        ]);
    }
    public function update(Request $request, $genre_id)
    {
        $genre = Genre::findOrFail($genre_id);
        // dd($request->genre_id);
        // dd($request->genre_name);
        $request->validate([
            'genre_name' => 'required|string|max:255|unique:genres,genre_name,' . $genre_id . ',genre_id',
        ]);

        $genre->update([
            'genre_name' => $request->genre_name,
        ]);
        // dd($genre);
        return redirect()->route('cms.genres.index')->with('success', 'Genre updated successfully!');
    }

    public function store(Request $request)
    {
        $request->validate([
            'genre_name' => 'required|unique:genres,genre_name',
        ]);
        Genre::create([
            'genre_name' => $request->genre_name,
        ]);

        return redirect()->route('cms.genres.index')->with('success', 'Genre created successfully!');
    }

    public function destroy($genre_id)
    {
        $genre = Genre::findOrFail($genre_id);
        $genre->delete();
        return redirect()->route('cms.genres.index')->with('success', 'Genre deleted successfully!');
    }



}