<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class Rank extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'avatar', 'description', 'status'
    ];

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return updateOrCreate result
     */
    public function rankStore($request, $imageName = null)
    {

        try {
            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ];

            if ($imageName) {
                $data['avatar'] =  $imageName;
            }

            return $this->updateOrCreate([
                'id' => $request->id
            ], $data);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRankById(int $id): string
    {
        return $this->where(['id' => $id])->value('name');
    }
}
