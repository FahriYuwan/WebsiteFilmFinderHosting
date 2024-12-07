<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class VerifyEmailController extends Controller
{
    /**
     * Mark the user's email address as verified.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $userId = $request->route('id');
        $hash = $request->route('hash');

        // Find the user by ID
        $user = User::findOrFail($userId);

        // Verify the hash matches the user's email
        if (! hash_equals((string) $hash, sha1($user->email))) {
            abort(403, 'Invalid verification link.');
        }

        // Check if the email is already verified
        if ($user->hasVerifiedEmail()) {
            return redirect()->route('home')->with('verified', true);
        }

        // Mark the email as verified
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->route('home')->with('verified', true);
    }
}