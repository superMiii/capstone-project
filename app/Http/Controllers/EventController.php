<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function showAll()
    {
        $data = Event::with(['user', 'category'])->paginate(10);
        if ($data) {
            return response()->json([
                'status' => 'success',
                'message' => 'get data successfully',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'get data failed. Data not found',
                'data' => []
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validation = $this->validate($request, [
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

        $posterName = time() . '-' . $validation['poster']->getClientOriginalName();
        $validation['poster']->move('poster_uploads', $posterName);

        $data = Event::create([
            'name' => $validation['name'],
            'description' => $validation['description'],
            'poster' => $posterName,
            'time' => $validation['time'],
            'place' => $validation['place'],
            'date' => $validation['date'],
            'register_link' => $validation['register_link'],
            'ticket_price' => $validation['ticket_price'],
            'category_id' => $validation['category_id'],
            'user_id' => $validation['user_id'],
        ]);

        if ($data) {
            return response()->json([
                'status' => 'success',
                'message' => 'create data successfully',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'create data failed',
                'data' => []
            ], 400);
        }
    }

    //
}
