<?php

namespace App\Http\Controllers;

use App\Models\{Course};
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    /**
     * Create a new course.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the incoming request data using the CreateCourseRequest class
        
        // Retrieve validated data from the request
        $validatedData = $request->validated();

        // Create a new course record in the database
        $course = Course::create($validatedData);

        // Return a response indicating success or failure
        if ($course) {
            // Course created successfully
            return response()->json(['message' => 'Course created successfully', 'course' => $course], 201);
        } else {
            // Failed to create course
            return response()->json(['message' => 'Failed to create course'], 500);
        }
    }

}
