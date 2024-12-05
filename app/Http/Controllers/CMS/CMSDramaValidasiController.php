<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class CMSDramaValidasiController extends Controller
{
    // Menampilkan daftar film dengan pagination, filter, dan pencarian
    public function index(Request $request)
    {
        // Membuat query dasar dengan relasi yang diperlukan
        $query = Film::with(['genres', 'actors', 'awards', 'countries'])
            ->orderBy('film_id', 'desc');

        // Filter berdasarkan status jika ada
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Pencarian berdasarkan judul jika ada
        if ($request->filled('search')) {
            $searchTerm = strtolower($request->search);
            $query->whereRaw('LOWER(title) LIKE ?', ["%{$searchTerm}%"]);
        }

        // Mendapatkan nilai perPage dari request atau default 10
        $perPage = $request->input('perPage', 10);

        // Mendapatkan data yang dipaginasi
        $films = $query->paginate($perPage)->withQueryString();

        // Mengirim data ke Inertia view
        return Inertia::render('CMS/CMSDrama/CMSDrama', [
            'films' => $films,
            'filters' => [
                'status' => $request->input('status', ' '),
                'search' => $request->input('search', ' '),
                'perPage' => $perPage,
            ],
        ]);
    }

    // Mengupdate data film
    // public function update(Request $request, $film_id)
    // {
    //     $film = Film::findOrFail($film_id);

    //     // Validasi data
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'synopsis' => 'required|string',
    //         'year_release' => 'required|integer',
    //         'status' => 'required|string',
    //         // Tambahkan validasi lain sesuai kebutuhan
    //     ]);

    //     $film->update($validatedData);

    //     // Sinkronisasi relasi jika ada
    //     if ($request->has('genres')) {
    //         $film->genres()->sync($request->genres);
    //     }

    //     if ($request->has('actors')) {
    //         $film->actors()->sync($request->actors);
    //     }

    //     if ($request->has('awards')) {
    //         $film->awards()->sync($request->awards);
    //     }

    //     if ($request->has('countries')) {
    //         $film->countries()->sync($request->countries);
    //     }

    //     return redirect()->route('cms.dramavalidasi.index')
    //         ->with('success', 'Film updated successfully.');
    // }

    // Menerima film (mengubah status menjadi 'Accepted')
    public function accept(Request $request, $film_id)
    {
        $film = Film::findOrFail($film_id);
        $film->status = 'accepted';
        $film->save();
    
        return redirect()->route('cms.dramavalidasi.index', [
            'status' => $request->input('status', ''),
            'search' => $request->input('search', ''),
            'perPage' => $request->input('perPage', 10),
            'page' => $request->input('page', 1),
        ])->with('success', 'Film accepted successfully.');
    }
    // Menolak film (mengubah status menjadi 'Rejected')
    public function reject(Request $request, $film_id)
    {
        $film = Film::findOrFail($film_id);
        $film->status = 'rejected';
        $film->save();
    
        return redirect()->route('cms.dramavalidasi.index', [
            'status' => $request->input('status', ''),
            'search' => $request->input('search', ''),
            'perPage' => $request->input('perPage', 10),
            'page' => $request->input('page', 1),
        ])->with('success', 'Film rejected successfully.');
    }

    // Menghapus film
    public function destroy(Request $request, $film_id)
    {
        // Hapus data dari tabel pivot
        DB::statement('DELETE FROM film_genre WHERE film_id = ?', [$film_id]);
        DB::statement('DELETE FROM film_award WHERE film_id = ?', [$film_id]);
        DB::statement('DELETE FROM film_actor WHERE film_id = ?', [$film_id]);
    
        // Hapus data dari tabel utama
        DB::statement('DELETE FROM films WHERE film_id = ?', [$film_id]);
    
        return redirect()->route('cms.dramavalidasi.index', [
            'status' => $request->input('status', ''),
            'search' => $request->input('search', ''),
            'perPage' => $request->input('perPage', 10),
            'page' => $request->input('page', 1),
        ])->with('success', 'Film deleted successfully.');
    }
}