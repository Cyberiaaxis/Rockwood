<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FightClubResource extends JsonResource
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
            'name' => $this->clubName,
            'icon' => $this->icon,
            'image' => $this->bgimage,
            'area' => $this->area,
            'users' => UserResource::collection($this->users),
        ];
    }
}
