<?php

use App\Http\Controllers\DetailPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use GuzzleHttp\Middleware;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Middleware\CheckUserRole;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CMS\CMSCountriesController;
use App\Http\Controllers\CMS\CMSUsersController;
use App\Http\Controllers\CMS\CMSGenresController;
use App\Http\Controllers\CMS\CMSActorsController;
use App\Http\Controllers\CMS\CMSInputNewFilmController;
use App\Http\Controllers\CMS\CMSAwardsController;
use App\Http\Controllers\CMS\CMSDramaValidasiController;
use App\Http\Controllers\CMS\CMSReviewsController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/', function () {
    return Inertia::render('Home/introduction', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/profile', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/reviews', [DetailPageController::class, 'store'])->name('reviews.store');

Route::get('/api/search',[SearchController::class, 'search']);
Route::get('/detailpage/{film_id}', [DetailPageController::class, 'show'])->name('movie.show');

Route::get('/searchresultpage', [SearchController::class, 'search'])->name('searchresultpage.show');

Route::middleware(['auth', CheckUserRole::class . ':admin'])->group(function () {
    Route::get('/cmsusers', [CMSUsersController::class, 'index'])->name('cms.users.index');
    Route::put('/cmsusers/{user_id}', [CMSUsersController::class, 'update'])->name('cms.users.update');
    Route::delete('/cmsusers/{user_id}', [CMSUsersController::class, 'destroy'])->name('cms.users.destroy');
    Route::post('/cmsusers', [CMSUsersController::class, 'store'])->name('cms.users.store');

    Route::prefix('cmsreviews')->name('cms.reviews.')->group(function () {
        Route::get('/', [CMSReviewsController::class, 'index'])->name('index');
        Route::put('/update', [CMSReviewsController::class, 'update'])->name('update'); // Update route method to PUT
        Route::delete('/destroy', [CMSReviewsController::class, 'destroy'])->name('destroy'); // Update route method to DELETE
    });
    // Route::prefix('cmsdrama')->name('cms.dramavalidasi.')->group(function () {
    //     Route::get('/', [CMSDramaValidasiController::class, 'index'])->name('index');
    //     // Route::put('/{film_id}', [CMSDramaValidasiController::class, 'update'])->name('update');
    //     Route::post('/accept/{film_id}', [CMSDramaValidasiController::class, 'accept'])->name('accept');
    //     Route::post('/reject/{film_id}', [CMSDramaValidasiController::class, 'reject'])->name('reject');
    //     Route::delete('/{film_id}', [CMSDramaValidasiController::class, 'destroy'])->name('destroy');
    // });

    Route::get('/cmsactors', [CMSActorsController::class, 'index'])->name('cms.actors.index');
    Route::post('/cmsactors', [CMSActorsController::class, 'store'])->name('cms.actors.store');
    Route::delete('/cmsactors/{actor_id}', [CMSActorsController::class, 'destroy'])->name('cms.actors.destroy');
    Route::put('/cmsactors/{actor_id}', [CMSActorsController::class, 'update'])->name('cms.actors.update');

    Route::get('/cmsgenres', function () {
        return Inertia::render('CMS/CMSGenres/CMSGenres');
    })->name('cmsgenres');

    Route::get('/cmsgenres', [CMSGenresController::class, 'index'])->name('cms.genres.index');
    Route::post('/cmsgenres', [CMSGenresController::class, 'store'])->name('cms.genres.store');
    Route::delete('/cmsgenres/{genre_id}', [CMSGenresController::class, 'destroy'])->name('cms.genres.destroy');
    Route::put('/cmsgenres/{genre_id}', [CMSGenresController::class, 'update'])->name('cms.genres.update');

    Route::get('/cmsawards', function () {
        return Inertia::render('CMS/CMSAwards/CMSAwards');
    })->name('cmsawards');

    Route::get('/cmsawards', [CMSAwardsController::class, 'index'])->name('cms.awards.index');
    Route::post('/cmsawards', [CMSAwardsController::class, 'store'])->name('cms.awards.store');
    Route::delete('/cmsawards/{award_id}', [CMSAwardsController::class, 'destroy'])->name('cms.awards.destroy');
    Route::put('/cmsawards/{award_id}', [CMSAwardsController::class, 'update'])->name('cms.awards.update');

    Route::get('/cmscountries', function () {
        return Inertia::render('CMS/CMSCountries/CMSCountries');
    })->name('cmscountries');

    Route::get('/cmscountries', [CMSCountriesController::class, 'index'])->name('cms.countries.index');
    Route::post('/cmscountries', [CMSCountriesController::class, 'store'])->name('cms.countries.store');
    Route::delete('/cmscountries/{countries_id}', [CMSCountriesController::class, 'destroy'])->name('cms.countries.destroy');
    Route::put('/cmscountries/{countries_id}', [CMSCountriesController::class, 'update'])->name('cms.countries.update');

    Route::prefix('cmsdrama')->name('cms.dramavalidasi.')->group(function () {
        Route::get('/', [CMSDramaValidasiController::class, 'index'])->name('index');
        Route::get('edit/{film_id}', [CMSInputNewFilmController::class, 'edit'])->name('edit');
        Route::post('update/{film_id}', [CMSInputNewFilmController::class, 'update'])->name('update');
        // Route::put('/{film_id}', [CMSDramaValidasiController::class, 'update'])->name('update');
        Route::post('/accept/{film_id}', [CMSDramaValidasiController::class, 'accept'])->name('accept');
        Route::post('/reject/{film_id}', [CMSDramaValidasiController::class, 'reject'])->name('reject');
        Route::delete('/{film_id}', [CMSDramaValidasiController::class, 'destroy'])->name('destroy');
    });
});

// Rute untuk CMS Drama Input dengan middleware khusus user
Route::middleware(['auth'])->group(function () {
    Route::get('/cmsdramainput',[CMSInputNewFilmController::class, 'index'])->name('cms.dramainput.index');
    Route::post('/cmsdramainput/store',[CMSInputNewFilmController::class, 'store'])->name('cms.dramainput.store');
});


Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/bookmark', [BookmarkController::class, 'index'])->name('bookmark.index');
    Route::post('/unbookmark', [BookmarkController::class, 'unbookmark'])->name('unbookmark');
    Route::post('/bookmarks', [BookmarkController::class, 'store'])->name('bookmarks.store');
    Route::delete('/bookmarks/{film}', [BookmarkController::class, 'destroy'])->name('bookmarks.destroy');
});
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/home', [HomeController::class, 'index'] )->middleware(['auth', 'verified'])->name('home');
// Route::get('/welcome', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth','verified'],)->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('email/verify/{id}/{hash}', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::get('email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

require __DIR__.'/auth.php';

// Route untuk redirect ke Google SSO
Route::get('/auth/google', function () {
    return Socialite::driver('google')->scopes(['profile', 'email'])->redirect();
})->name('login.google');

// Route untuk handle callback dari Google SSO
Route::get('/auth/google/callback', function () {
    $user = Socialite::driver('google')->stateless()->user();

    // Logika untuk memeriksa apakah user sudah ada atau belum
    $existingUser = User::where('email', $user->getEmail())->first();

    if ($existingUser) {
        // Jika user sudah ada, login langsung
        if ($existingUser->status !== true) {
            return Inertia::render('Auth/NotificationBanned');
        }
        Auth::login($existingUser);
    } else {
        // Jika user belum ada, buat user baru
        $newUser = User::create([
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'google_id' => $user->getId(),
            'avatar' => $user->getAvatar(),
            'role_id' => 2,
            'password' => Hash::make(Str::random(24)), // Password acak
        ]);
        Auth::login($newUser);
    }

    return redirect('/home'); // Redirect ke halaman home setelah login
});

