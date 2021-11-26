<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function showAll()
    {
        $data = Event::with(['user', 'category'])->paginate(10);
        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'get data successfully',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'get data failed. Data not found',
                'data' => []
            ], 404);
        }
    }

    public function showById($id)
    {
        $data = Event::with(['user', 'category'])->find($id);
        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'get one data successfully',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'get data failed. Data not found',
                'data' => []
            ], 404);
        }
    }

    public function showByIdUser($id)
    {
        $user = User::find($id);
        if ($user) {
            $data = Event::with(['user', 'category'])->where('user_id', $id)->get();
            if ($data) {
                return response()->json([
                    'status' => true,
                    'message' => 'get one data successfully',
                    'data' => $data
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'get data failed. Data not found',
                    'data' => []
                ], 404);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'user not found',
                'data' => []
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5',
            'description' => 'required',
            'poster' => 'required|mimes:jpg,png,jpeg',
            'time' => 'required',
            'place' => 'required',
            'date' => 'required',
            'register_link' => 'required',
            'ticket_price' => 'required',
            'category_id' => 'required|numeric',
            'user_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 400);
        } else {
            $posterName = time() . '-' . $request->poster->getClientOriginalName();
            $request->poster->move('poster_uploads', $posterName);

            $data = Event::create([
                'name' => $request->name,
                'description' => $request->description,
                'poster' => $posterName,
                'time' => $request->time,
                'place' => $request->place,
                'date' => $request->date,
                'register_link' => $request->register_link,
                'ticket_price' => $request->ticket_price,
                'category_id' => $request->category_id,
                'user_id' => $request->user_id,
            ]);

            if ($data) {
                return response()->json([
                    'status' => true,
                    'message' => 'create data successfully',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'create data failed',
                ], 400);
            }
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5',
            'description' => 'required',
            'poster' => 'mimes:jpg,png,jpeg',
            'time' => 'required',
            'place' => 'required',
            'date' => 'required',
            'register_link' => 'required',
            'ticket_price' => 'required',
            'category_id' => 'required|numeric',
            'user_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 400);
        } else {
            $event = Event::find($id);
            if ($event->poster) {
                $path_name = 'poster_uploads/' . $event->poster;
                if (file_exists($path_name)) {
                    unlink($path_name);
                }
            }

            $posterName = time() . '-' . $request->poster->getClientOriginalName();
            $request->poster->move('poster_uploads', $posterName);

            $data = $event->update([
                'name' => $request->name,
                'description' => $request->description,
                'poster' => $posterName,
                'time' => $request->time,
                'place' => $request->place,
                'date' => $request->date,
                'register_link' => $request->register_link,
                'ticket_price' => $request->ticket_price,
                'category_id' => $request->category_id,
                'user_id' => $request->user_id,
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
        }
    }
    //
    public function destroy($id)
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
                'message' => 'delete failed!',
            ], 400);
        }
    }
}
