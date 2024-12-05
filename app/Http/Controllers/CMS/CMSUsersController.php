<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CMSUsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::where('role_id', 2)->orderBy('user_id', 'desc')->paginate(10);
        return Inertia::render('CMS/CMSUsers/CMSUsers', [
            'users' => $users,
        ]);
    }

    public function show($user_id)
    {
        $user = User::findOrFail($user_id);
        return Inertia::render('CMS/CMSUsers/CMSUsers', [
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
        ]);
    
        // Buat pengguna baru
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt(Str::random(10)), // Enkripsi password dengan password random
            'role_id' => 2, // Berikan role_id 2 untuk pengguna biasa
        ]);
    
        return redirect()->route('cms.users.index')->with('success', 'User created successfully!');
    }

    public function update(Request $request, $user_id)
    {
        $user = User::findOrFail($user_id);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user_id . ',user_id',
            'status' => 'required|boolean',
        ]);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'status' => $request->status,
        ]);
        
        return redirect()->route('cms.users.index')->with('success', 'User updated successfully!');
    }

    public function destroy($user_id)
    {
        $user = User::findOrFail($user_id);
        $user->delete();
        return redirect()->route('cms.users.index')->with('success', 'User deleted successfully!');
    }
}