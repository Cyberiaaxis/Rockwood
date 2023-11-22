<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'editable' =>  auth()->id() === $this->user->id,
            'createdAt' => $this->created_at->isoFormat('dddd, MMMM D, YYYY h:mm A'),
            'poster' => [
                'id' => $this->user->id,
                'title' => $this->user->name,
                'avatar' => $this->user->avatar,
                'posts' => $this->user->totalPosts,

            ],
        ];
    }
}
