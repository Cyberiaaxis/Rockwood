<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ForumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'parent_id' => $this->parent_id,
            'stats' => [
                'threads' => $this->threads_count,
                'posts' => $this->posts_count,
            ],
            'recentPost' => [
                'thread' => [
                    'title' => '',
                    'url' => ''
                ],
                'poster' => [
                    'name' => '',
                    'avatar' => '',
                    'url' => '',
                ],
                'publishAt' => now(),
            ]
        ];
    }
}
