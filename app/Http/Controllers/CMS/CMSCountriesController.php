<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\Countries;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class CMSCountriesController extends Controller{
    public function index(Request $request)
    {
        $countries = Countries::orderBy('countries_id', 'desc')->get();
        return Inertia::render('CMS/CMSCountries/CMSCountries', [
            'countries' => $countries,
        ]);
    }

    public function show($countries_id)
    {
        $country = Countries::findOrFail($countries_id);
        return Inertia::render('CMS/CMSCountries/CMSCountries', [
            'country' => $country,
        ]);
    }

    public function update(Request $request, $countries_id)
    {
        $country = Countries::findOrFail($countries_id);
        // dd($request->country_name);
        $request->validate([
            'country_name' => 'required|string|max:255|unique:countries,country_name,' . $countries_id . ',countries_id',
        ]);

        $country->update([
            'country_name' => $request->country_name,
        ]);

        return redirect()->route('cms.countries.index')->with('success', 'Country updated successfully!');
    }

    public function store(Request $request)
    {
        $request->validate([
            'country_name' => 'required|unique:countries,country_name',
        ]);
        Countries::create([
            'country_name' => $request->country_name,
        ]);

        return redirect()->route('cms.countries.index')->with('success', 'Country created successfully!');
    }

    public function destroy($countries_id)
    {
        $country = Countries::findOrFail($countries_id);
        $country->delete();
        return redirect()->route('cms.countries.index')->with('success', 'Country deleted successfully!');
    }

}