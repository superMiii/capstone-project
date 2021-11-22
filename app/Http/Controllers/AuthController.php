<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // validation
        $validation = $this->validate($request, [
            'name' => 'required|min:3|max:64|',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);

        // restore data to each variable
        $name = $validation['name'];
        $email = $validation['email'];
        $password = Hash::make($validation['name']);
    }
}
