<?php

namespace App\Http\Resources;

use App\Models\Post;
use App\Models\User;
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


        $sub = false;

        preg_match_all('/>>(\d+)/is', $this->content, $matches);

        if (isset($matches[1])) {
            $quote = $matches[1];

            if (is_array($quote)) {
                $sub = [];
                foreach ($quote as $q) {
                    $sub[] = new PostsResource(Post::find($q)) ?? null;
                }
            } else {
                $sub = Post::find($quote) ?? null;
            }
        }

        $content = preg_replace('/>>(\d+)([\r\n])?/is', '', $this->content);

        $content = trim($content);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $content,
            'like' => $this->like,
            'dislike' => $this->dislike,
            'createdAt' => $this->created_at->isoFormat('dddd, MMMM D, YYYY h:mm A'),
            'poster' => [
                'id' => $this->user->id,
                'title' => $this->user->name,
                'avatar' => $this->user->avatar,
                'posts' => $this->user->totalPosts,
                'role' => $this->user->getUserRoles(),
                'forumRank' => $this->user->getUserForumRankName(),
            ],
            'quotes' => $sub,
        ];
    }
}
