<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginationResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {

        $request = $this->resource->toArray();

        $response = [
            'currentPage' => $this->resource->currentPage(),
            'total' => $this->resource->total(),
            'data' => $request['data'],
        ];

        return $response;
    }
}
