<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function showAll()
    {
        $data = Category::all();

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
    }

    public function showById($id)
    {
        $data = Category::find($id);

        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'successfully get one data.',
                'data' => $data
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'data not found',
                'data' => []
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|min:3|unique:categories',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 400);
        } else {
            $create = Category::create([
                'category_name' => $request->category_name
            ]);

            if ($create) {
                return response()->json([
                    'status' => true,
                    'message' => 'successfully added',
                    'data' => $create
                ], 201);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'failed to added',
                    'data' => []
                ], 400);
            }
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|min:3'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 400);
        } else {
            $category = Category::find($id);

            $data = $category->update([
                'category_name' => $request->category_name
            ]);

            if ($data) {
                return response()->json([
                    'status' => true,
                    'message' => 'data category successfully updated',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'failed to update data',
                ], 400);
            }
        }
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();

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
}
