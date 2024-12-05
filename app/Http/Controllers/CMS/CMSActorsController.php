<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\Actor;
use App\Models\Countries;
use Illuminate\Http\Request;
use Inertia\Inertia;


// $query = Film::with(['genres', 'actors', 'awards', 'countries']);
class CMSActorsController extends Controller{
    public function index(){
        $actors = Actor::with('countries')->orderBy('actor_id', 'desc')->get();
        $countries = Countries::orderBy('country_name', 'asc')->get();
        return Inertia::render('CMS/CMSActors/CMSActors', [
            'actors' => $actors,
            'countries' => $countries,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'countries_id' => 'required',
            'actor_name' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'url_actor' => 'required|string|max:255',
        ]);

        Actor::create([
            'countries_id' => $request->countries_id,
            'actor_name' => $request->actor_name,
            'birthdate' => $request->birthdate,
            'url_actor' => $request->url_actor,
        ]);

        return redirect()->route('cms.actors.index')->with('success', 'Actor created successfully!');
    }

    // public function update(Request $request, $countries_id)
    // {
    //     $country = Countries::findOrFail($countries_id);
    //     // dd($request->country_name);
    //     $request->validate([
    //         'country_name' => 'required|string|max:255|unique:countries,country_name,' . $countries_id . ',countries_id',
    //     ]);

    //     $country->update([
    //         'country_name' => $request->country_name,
    //     ]);

    //     return redirect()->route('cms.countries.index')->with('success', 'Country updated successfully!');
    // }

    public function update(Request $request, $actor_id){
        $actor = Actor::findOrFail($actor_id);
        $request->validate([
            'actor_name' => 'required|string|max:255',
            'birthdate' => 'required|date',
        ]);

        $actor->update([
            'actor_name' => $request->actor_name,
            'birthdate' => $request->birthdate,
        ]);

        return redirect()->route('cms.actors.index')->with('success', 'Actor updated successfully!');
    }


    public function destroy($actor_id){
        $actor = Actor::findOrFail($actor_id);
        $actor->delete();
        return redirect()->route('cms.actors.index')->with('success', 'Actor deleted successfully!');
    }

}