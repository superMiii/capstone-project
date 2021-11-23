<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function showAll()
    {
        $data = Category::all();

        if ($data) {
            return response()->json([
                'status' => 'success',
                'message' => 'successfully get data.',
                'data' => $data
            ], 201);
        } else {
            return response()->json([
                'status' => 'failed',
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
                'status' => 'success',
                'message' => 'successfully get one data.',
                'data' => $data
            ], 201);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'data not found',
                'data' => []
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validation = $this->validate($request, [
            'category_name' => 'required|min:3|unique:categories',
        ]);

        $categoryName = $validation['category_name'];

        $create = Category::create([
            'category_name' => $categoryName
        ]);

        if ($create) {
            return response()->json([
                'status' => 'success',
                'message' => 'successfully added',
                'data' => $create
            ], 201);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'failed to added',
                'data' => []
            ], 400);
        }
    }

    public function update(Request $request, $id)
    {
        $validation = $this->validate($request, [
            'category_name' => 'required|min:3'
        ]);

        $category = Category::find($id);

        $data = $category->update([
            'category_name' => $validation['category_name']
        ]);

        if ($data) {
            return response()->json([
                'status' => 'success',
                'message' => 'data category successfully updated',
                'data' => $category
            ], 201);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'failed to update data',
                'data' => []
            ], 400);
        }
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'delete successfully',
                'data' => []
            ], 200);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'delete failed. Data not found',
                'data' => []
            ], 404);
        }
    }
}
