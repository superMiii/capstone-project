<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function showAllUsers(Request $request)
    {
        $user = User::all();
        if ($user) {
            return response()->json([
                'status' => true,
                'message' => 'get all users successfully',
                'data' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'failed. data not found',
                'data' => null
            ], 404);
        }
    }

    public function showDetailUser(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => true,
                'message' => 'get detail user successfully',
                'data' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'failed. data not found',
                'data' => null
            ], 404);
        }
    }

    public function changeRole(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|in:admin,user'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 400);
        } else {
            $user = User::find($id);
            if ($user) {
                $data = $user->update([
                    'role' => $request->role
                ]);
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
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'failed. data not found',
                    'data' => null
                ], 404);
            }
        }
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if ($user) {
            if ($user->picture) {
                $path_name = 'users_profile/' . $user->picture;
                if (file_exists($path_name)) {
                    unlink($path_name);
                }
            }
            $user->delete();

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
    }

    public function showAllEvents()
    {
        $event = Event::with(['user', 'category'])->get();
        if ($event) {
            return response()->json([
                'status' => true,
                'message' => 'get all events successfully',
                'data' => $event
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'failed. data not found',
                'data' => null
            ], 404);
        }
    }

    public function changeStatusEvent(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:approved,not approved,waiting'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 400);
        } else {
            $event = Event::find($id);
            if ($event) {
                $data = $event->update([
                    'status' => $request->status
                ]);
                if ($data) {
                    return response()->json([
                        'status' => true,
                        'message' => 'update successfully',
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'update failed!',
                    ], 400);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'failed. data not found',
                    'data' => null
                ], 404);
            }
        }
    }

    public function deleteEvent($id)
    {
        $event = Event::find($id);

        if ($event) {
            if ($event->poster) {
                $path_name = 'poster_uploads/' . $event->poster;
                if (file_exists($path_name)) {
                    unlink($path_name);
                }
            }
            $event->delete();

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
    }

    //
}
