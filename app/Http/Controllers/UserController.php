<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function showProfile(Request $request)
    {
        $user = User::where('api_token', $request->api_token)->first();
        if ($user) {
            return response()->json([
                'status' => true,
                'message' => 'get profile successfully',
                'data' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'failed. data not found',
                'data' => []
            ], 404);
        }
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5',
            'picture' => 'mimes:jpg,png,jpeg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 400);
        } else {
            $user = User::where('api_token', $request->api_token)->first();
            if ($request->picture) {
                if ($user->picture) {
                    $path_name = 'users_profile/' . $user->picture;
                    if (file_exists($path_name)) {
                        unlink($path_name);
                    }
                }
                $pictureName = time() . '-' . $request->picture->getClientOriginalName();
                $request->picture->move('users_profile', $pictureName);

                $data = $user->update([
                    'name' => $request->name,
                    'picture' => $pictureName,
                ]);
            } else {
                $data = $user->update([
                    'name' => $request->name,
                    'picture' => $user->picture,
                ]);
            }

            if ($data) {
                return response()->json([
                    'status' => true,
                    'message' => 'update successfully',
                ], 201);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'update failed!',
                ], 400);
            }
        }
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 400);
        } else {
            $user = User::where('api_token', $request->api_token)->first();
            if ($user) {
                $data = $user->update([
                    'password' => Hash::make($request->password)
                ]);
                if ($data) {
                    return response()->json([
                        'status' => true,
                        'message' => 'password successfully changed',
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'change password failed',
                    ], 400);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'user not found',
                ], 404);
            }
        }
    }
}
