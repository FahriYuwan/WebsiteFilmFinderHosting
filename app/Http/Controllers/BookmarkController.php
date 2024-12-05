<?php
namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Film;

class BookmarkController extends Controller
{
    public function store(Request $request)
    {
        // Validasi film_id
        $request->validate([
            'film_id' => 'required|exists:films,film_id',
        ]);

        // Buat bookmark baru
        Bookmark::create([
            'user_id' => Auth::id(),
            'film_id' => $request->film_id,
        ]);

        return back();
    }

    public function destroy($film)
    {
        // Menghapus bookmark berdasarkan user dan film_id
        Bookmark::where('user_id', Auth::id())->where('film_id', $film)->delete();

        return back();
    }

    public function index()
    {
        // Ambil ID film yang di-bookmark oleh user
        $userBookmarks = auth()->user()->bookmarks->pluck('film_id')->toArray();
    
        // Ambil data film berdasarkan ID yang di-bookmark
        $films = Film::whereIn('film_id', $userBookmarks)->get();
    
        // Kirim data ke halaman Bookmark
        return Inertia::render('Bookmark/Bookmark', [
            'userBookmarks' => $userBookmarks,
            'films' => $films,
        ]);
    }

    public function unbookmark(Request $request)
    {
        $user = auth()->user();
        $filmId = $request->input('film_id');

        // Hapus bookmark dari database
        $user->bookmarks()->where('film_id', $filmId)->delete();

        return response()->json(['success' => true]);
    }
}
