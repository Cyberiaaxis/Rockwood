<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostsPaginationResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {

        $response = [
            'currentPage' => $this->resource->currentPage(),
            'total' => $this->resource->lastPage(),
            'data' => PostsResource::collection($this->resource),
        ];

        return $response;
    }
}
