<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:64|',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 400);
        } else {
            // store data to db
            $register = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user'
            ]);

            // create response api
            if ($register) {
                return response()->json([
                    'status' => true,
                    'message' => 'Register success!!',
                    'data' => $register
                ], 201);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Register failed!!',
                    'data' => []
                ], 400);
            }
        }
    }

    public function login(Request $request)
    {
        // validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 400);
        } else {
            $user = User::where('email', $request->email)->first();

            if ($user) {
                if (Hash::check($request->password, $user->password)) {
                    $api_token = base64_encode(Str::random(40));

                    $user->update([
                        'api_token' => $api_token,
                    ]);

                    return response()->json([
                        'status' => true,
                        'message' => 'Login Successfully!!',
                        'data' => [
                            'user' => $user,
                            'api_token' => $api_token,
                        ]
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Wrong password',
                        'data' => []
                    ], 400);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Email isn\'t registered. Please register first!!',
                    'data' => []
                ], 404);
            }
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
                'status' => true,
                'message' => 'Logout Successfully!!',
                'data' => []
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Api token not found!!',
                'data' => []
            ], 404);
        }
    }
}
