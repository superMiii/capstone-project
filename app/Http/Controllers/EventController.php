<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Validator;

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

    public function update(Request $request, $id)
    {
        // $this->validate($request, [
        //     'name' => 'required|min:5',
        //     'description' => 'required',
        //     'poster' => 'mimes:jpg,png,jpeg',
        //     'time' => 'required',
        //     'place' => 'required',
        //     'date' => 'required',
        //     'register_link' => 'required',
        //     'ticket_price' => 'required',
        //     'category_id' => 'required|numeric',
        //     'user_id' => 'required|numeric',
        // ]);

        // $event = Event::find($id);
        // if (!$event->poster) {
        //     $path_name = 'poster_uploads/' . $event->poster;
        //     unlink($path_name);
        // }

        // $posterName = time() . '-' . $request->poster->getClientOriginalName();
        // $request->poster->move('poster_uploads', $posterName);

        // $data = $event->update([
        //     'name' => $request->name,
        //     'description' => $request->description,
        //     'poster' => $request->poster,
        //     'time' => $request->time,
        //     'place' => $request->place,
        //     'date' => $request->date,
        //     'register_link' => $request->register_link,
        //     'ticket_price' => $request->ticket_price,
        //     'category_id' => $request->category_id,
        //     'user_id' => $request->user_id,
        // ]);

        // if ($data) {
        //     return response()->json([
        //         'status' => 'success',
        //         'message' => 'update successfully',
        //         'data' => $data
        //     ], 200);
        // } else {
        //     return response()->json([
        //         'status' => 'failed',
        //         'message' => 'failed to update',
        //         'data' => []
        //     ], 400);
        // }
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
                'success' => false,
                'message' => 'Semua Kolom Wajib Diisi!',
                'data'   => $validator->errors()
            ], 400);
        } else {

            $event = Event::find($id);
            if ($event->poster) {
                $path_name = 'poster_uploads/' . $event->poster;
                unlink($path_name);
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
                    'status' => 'success',
                    'message' => 'update successfully',
                    'data' => $data
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'update failed!',
                ], 400);
            }
        }
    }
    //
}
