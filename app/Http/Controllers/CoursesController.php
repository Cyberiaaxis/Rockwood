<?php

namespace App\Http\Controllers;

use App\Models\{Course, UserDetail, User};
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $course = Course::whereNull('parent_id')->get();

        if ($request->ajax()) {
            return response()->json(['html' => view('ajax.courses', ['course_list' => $course, 'title' => 'Education'])->render()]);
        }

    return view('player.course', ['courses' => $course, 'title' => 'Education']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(auth()->user()->doneCourse($request->courseId)){
        return response()->json("You already completed this course");
        }

        auth()->user()->userdetails()->update(['active_course' => $request->courseId]);
        auth()->user()->course()->attach($request->courseId);
    return response()->json("You just Join the course");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        $title = $course->name;

        if ($course->subCourses()->exists()) {
            $data = ['sub_courses' => $course->subCourses()->get(), 'title' => $title];
        } else {
            $data = ['course_display' => true, 'course' => $course, 'title' => $title];
        }

    return response()->json(['html' => view('ajax.courses', $data)->render()]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        //
    }
}
