<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\Film;
use App\Models\Countries;
use App\Models\Award;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Actor;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

// $query = Film::with(['genres', 'actors', 'awards', 'countries']);

class CMSInputNewFilmController extends Controller{

    public function index(){
        $countries = Countries::orderBy('country_name', 'asc')->get();
        $awards = Award::orderBy('award_name', 'asc')->get();
        $genres = Genre::orderBy('genre_name', 'asc')->get();
        $actors = Actor::orderBy('actor_name', 'asc')->get();
        return Inertia::render('CMS/CMSDramaInput/CMSDramaInput', [
            'countries' => $countries,
            'awards' => $awards,
            'genres' => $genres,
            'actors' => $actors,
        ]);
    }

    public function store(Request $request){
        // dd($request);
        $request->validate([
            'title' => 'required|string|max:255',
            'fileImage' => 'required|image',
            'alternative_title' => 'required|string|max:255',
            'year_release' => 'required|integer',
            'duration' => 'required|integer',
            'countries_id' => 'required',
            // 'awards_id' => 'required|array',
            'genres_id' => 'required|array',
            'actors_id' => 'required|array',
            'url_trailer' => 'required|string|max:255',
            'availability' => 'required|string|max:255',
            'synopsis' => 'required|string',
        ]);
    
        // Simpan file ke folder public/images
        $path = $request->file('fileImage')->store('images', 'public');
    
        // Buat record film baru dengan menyimpan path url_banner
        $film = Film::create([
            'title' => $request->title,
            'url_banner' => $path, // Simpan path direktori di sini
            'alternative_title' => $request->alternative_title,
            'year_release' => $request->year_release,
            'duration' => $request->duration,
            'countries_id' => $request->countries_id,
            'url_trailer' => $request->url_trailer,
            'availability' => $request->availability,
            'synopsis' => $request->synopsis,
        ]);
    
        // Extract only the IDs from the awards, genres, and actors arrays
        if (!empty($request->awards_id)) {
            $awardIds = array_column($request->awards_id, 'award_id');
            $film->awards()->attach($awardIds);
        }
        // $awardIds = array_column($request->awards_id, 'award_id');
        $genreIds = $request->genres_id;
        $actorIds = array_column($request->actors_id, 'actor_id');
    
        // Lampirkan awards, genres, dan actors ke film
        // $film->awards()->attach($awardIds);
        $film->genres()->attach($genreIds);
        $film->actors()->attach($actorIds);
    
        return redirect()->route('cms.dramainput.index')->with('success', 'Film created successfully!');
    }

    public function edit($film_id){
        $film = Film::with(['genres', 'actors', 'awards', 'countries'])->findOrFail($film_id);
        $countries = Countries::orderBy('country_name', 'asc')->get();
        $awards = Award::orderBy('award_name', 'asc')->get();
        $genres = Genre::orderBy('genre_name', 'asc')->get();
        $actors = Actor::orderBy('actor_name', 'asc')->get();
        return Inertia::render('CMS/CMSDramaEdit/CMSDramaEdit', [
            'film' => $film,
            'countries' => $countries,
            'awards' => $awards,
            'genres' => $genres,
            'actors' => $actors,
        ]);
    }

    public function update(Request $request){
        // Remove or comment out the debug statement
        // dd($request);
    
        $request->validate([
            'film_id' => 'required|integer', 
            'title' => 'required|string|max:255',
            'fileImage' => 'nullable|image',
            'alternative_title' => 'required|string|max:255',
            'year_release' => 'required|integer',
            'duration' => 'required|integer',
            'countries_id' => 'required',
            // 'awards_id' => 'required|array',
            'genres_id' => 'required|array',
            'actors_id' => 'required|array',
            'url_trailer' => 'required|string|max:255',
            'availability' => 'required|string|max:255',
            'synopsis' => 'required|string',
        ]);
    
        $film = Film::findOrFail($request->film_id);
    
        if($request->hasFile('fileImage')){
            // Delete old image if exists
            if($film->url_banner){
                Storage::disk('public')->delete($film->url_banner);
            }
            $path = $request->file('fileImage')->store('images', 'public');
            $film->url_banner = $path;
        }
    
        $film->title = $request->title;
        $film->alternative_title = $request->alternative_title;
        $film->year_release = $request->year_release;
        $film->duration = $request->duration;
        $film->countries_id = $request->countries_id;
        $film->url_trailer = $request->url_trailer;
        $film->availability = $request->availability;
        $film->synopsis = $request->synopsis;
        $film->save();
    
        // Sync relations
        // Ekstrak ID dari array asosiatif yang dikirim
        if (!empty($request->awards_id)) {
            $awardIds = collect($request->awards_id)->pluck('award_id')->toArray(); // Hanya ambil award_id
            $film->awards()->sync($awardIds);
        }
        $genreIds = $request->genres_id;
        $actorIds = collect($request->actors_id)->pluck('actor_id')->toArray(); // Hanya ambil actor_id

        // Sync relasi dengan hanya ID saja
        $film->genres()->sync($genreIds);
        $film->actors()->sync($actorIds);
    
        return redirect()->route('cms.dramavalidasi.index')->with('success', 'Film updated successfully!');
    }
}



// class CMSActorsController extends Controller{
//     public function index(){
//         $actors = Actor::with('countries')->orderBy('actor_id', 'desc')->paginate(10);
//         $countries = Countries::orderBy('country_name', 'asc')->get();
//         return Inertia::render('CMS/CMSActors/CMSActors', [
//             'actors' => $actors,
//             'countries' => $countries,
//         ]);
//     }

//     public function store(Request $request){
//         $request->validate([
//             'countries_id' => 'required',
//             'actor_name' => 'required|string|max:255',
//             'birthdate' => 'required|date',
//             'url_actor' => 'required|string|max:255',
//         ]);

//         Actor::create([
//             'countries_id' => $request->countries_id,
//             'actor_name' => $request->actor_name,
//             'birthdate' => $request->birthdate,
//             'url_actor' => $request->url_actor,
//         ]);

//         return redirect()->route('cms.actors.index')->with('success', 'Actor created successfully!');
//     }

//     // public function update(Request $request, $countries_id)
//     // {
//     //     $country = Countries::findOrFail($countries_id);
//     //     // dd($request->country_name);
//     //     $request->validate([
//     //         'country_name' => 'required|string|max:255|unique:countries,country_name,' . $countries_id . ',countries_id',
//     //     ]);

//     //     $country->update([
//     //         'country_name' => $request->country_name,
//     //     ]);

//     //     return redirect()->route('cms.countries.index')->with('success', 'Country updated successfully!');
//     // }

//     public function update(Request $request, $actor_id){
//         $actor = Actor::findOrFail($actor_id);
//         $request->validate([
//             'actor_name' => 'required|string|max:255',
//             'birthdate' => 'required|date',
//         ]);

//         $actor->update([
//             'actor_name' => $request->actor_name,
//             'birthdate' => $request->birthdate,
//         ]);

//         return redirect()->route('cms.actors.index')->with('success', 'Actor updated successfully!');
//     }


//     public function destroy($actor_id){
//         $actor = Actor::findOrFail($actor_id);
//         $actor->delete();
//         return redirect()->route('cms.actors.index')->with('success', 'Actor deleted successfully!');
//     }

// }