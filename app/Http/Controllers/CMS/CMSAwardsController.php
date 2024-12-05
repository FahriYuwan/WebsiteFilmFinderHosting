<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\Award;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CMSAwardsController extends Controller
{
    /**
     * Menampilkan daftar penghargaan.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Mengambil daftar penghargaan
        $awards = Award::orderBy('award_id', 'desc')->get();

        return Inertia::render('CMS/CMSAwards/CMSAwards', [
            'awards' => $awards, // Sesuaikan dengan props di CMSAwards.jsx
        ]);
    }

    /**
     * Menyimpan penghargaan baru.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'award' => 'required|string|max:255',
            'year' => 'required|integer',
        ]);

        // Membuat penghargaan baru
        Award::create([
            'award_name' => $request->award,
            'year' => $request->year,
        ]);

        return redirect()->route('cms.awards.index')->with('success', 'Penghargaan berhasil ditambahkan!');
    }

    /**
     * Memperbarui data penghargaan.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $award_id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $award_id)
    {
        // Mencari penghargaan berdasarkan ID
        $award = Award::findOrFail($award_id);

        // Validasi input
        $request->validate([
            'award' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
        ]);

        // Memperbarui data penghargaan
        $award->update([
            'award_name' => $request->award,
            'year' => $request->year,
        ]);

        return redirect()->route('cms.awards.index')->with('success', 'Penghargaan berhasil diperbarui!');
    }

    /**
     * Menghapus penghargaan.
     *
     * @param  int  $award_id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($award_id)
    {
        // Mencari penghargaan berdasarkan ID
        $award = Award::findOrFail($award_id);

        // Menghapus penghargaan
        $award->delete();

        return redirect()->route('cms.awards.index')->with('success', 'Penghargaan berhasil dihapus!');
    }
}