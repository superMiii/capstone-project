<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class FavoriteController extends Controller
{
    public function showAllFavoriteUser(Request $request)
    {
        $user = User::where('api_token', $request->api_token)->first();
        if ($user->id) {
            $data = Favorite::latest()->with(['user', 'event'])->where('user_id', $user->id)->paginate(10);

            if ($data) {
                return response()->json([
                    'status' => true,
                    'message' => 'successfully get data.',
                    'data' => $data
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'data not found',
                    'data' => []
                ], 404);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'id user not found',
                'data' => []
            ], 404);
        }
    }

    public function addFavorite(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
            'event_id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 400);
        } else {
            $user = User::where('api_token', $request->api_token)->first();
            if ($user->id == $request->user_id) {
                $data = Favorite::create([
                    'user_id' => $request->user_id,
                    'event_id' => $request->event_id
                ]);

                if ($data) {
                    return response()->json([
                        'status' => true,
                        'message' => 'add to favorite successfully',
                    ], 201);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'add to favorite failed',
                    ], 400);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'you can add favorite to other user',
                ], 400);
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        $user = User::where('api_token', $request->api_token)->first();
        $favorite = Favorite::find($id);
        if ($user->id == $favorite->user_id) {
            if ($favorite) {
                $favorite->delete();

                return response()->json([
                    'status' => true,
                    'message' => 'delete successfully',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'delete failed. Data not found',
                ], 404);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'user id isn\'t yours',
            ], 404);
        }
    }
}
