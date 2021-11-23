<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function showAll()
    {
        $data = Event::paginate(10);

        if ($data['data']) {
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

    //
}
