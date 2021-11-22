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

        // store data to db
        $register = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password
        ]);

        // create response api
        if ($register) {
            return response()->json([
                'status' => 'success',
                'message' => 'Register success!!',
                'data' => $register
            ], 201);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'Register failed!!',
                'data' => []
            ], 400);
        }
    }
}
