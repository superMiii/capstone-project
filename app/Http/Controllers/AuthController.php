<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;

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
                'status' => 'failed',
                'message' => 'Register failed!!',
                'data' => []
            ], 400);
        }
    }

    public function login(Request $request)
    {
        // validation
        $validation = $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $email = $validation['email'];
        $password = $validation['password'];

        $user = User::where('email', $email)->first();

        if ($user) {
            if (Hash::check($password, $user->password)) {
                $api_token = base64_encode(Str::random(40));

                $user->update([
                    'api_token' => $api_token,
                ]);

                return response()->json([
                    'status' => 'success',
                    'message' => 'Login Successfully!!',
                    'data' => [
                        'user' => $user,
                        'api_token' => $api_token,
                    ]
                ], 200);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Wrong password',
                    'data' => []
                ], 400);
            }
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Email isn\'t registered. Please register first!!',
                'data' => []
            ], 404);
        }
    }

    public function logout(Request $request)
    {
        $api_token = $request->input('api_token');
        $user = User::where('api_token', $api_token)->first();
        if ($user) {
            $user->update([
                'api_token' => null,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Logout Successfully!!',
                'data' => []
            ], 200);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Api token not found!!',
                'data' => []
            ], 404);
        }
    }
}
