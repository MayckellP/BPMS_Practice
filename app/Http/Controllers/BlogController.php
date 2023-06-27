<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Blog;
use Illuminate\Database\Eloquent\Collection;

class BlogController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:show-blog|create-blog|edit-blog|delete-blog', ['only'=>['index']]);
        $this->middleware('permission:create-blog', ['only'=>['create', 'store']]);
        $this->middleware('permission:edit-blog', ['only'=>['edit', 'update']]);
        $this->middleware('permission:delete-blog', ['only'=>['destroy']]);
    }

    public function index()
    {
        $blogs = Blog::all();
        return Inertia::render('Blogs/Index', ['blogs' => $blogs]);

    }


    public function create()
    {
        return Inertia::render('Blogs/Crear');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'content' => 'required'
        ]);

        $request = Blog::create($validated);
        return to_route('blogs.index');
    }


    public function edit(Blog $blog)
    {
        return Inertia::render('Blogs/Editar', compact('blog'));
    }


    public function update(Request $request, Blog $blog)
    {
        request()->validate([
            'title' => 'required',
            'content' => 'required'
        ]);
        $blog->update($request->all());

        return to_route('blogs.index');

    }


    public function destroy(Blog $blog)
    {
        $blog->delete();
        return to_route('blogs.index');
    }
}
