<?php

namespace App\Models;

use Hamcrest\Description;
use Illuminate\Database\Eloquent\Model;
use Throwable;

class RealEstate extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id', 'name', 'description', 'avatar', 'status'
    ];

        /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return updateOrCreate result
     */
    public function realEstateStore($request, $imageName = null)
    {
        // dd($request->status);
        try {
            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ];

            if ($imageName) {
                $data['avatar'] =  $imageName;
            }
            // dd($data);
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
    public function getHouseById(int $id): string
    {
        try {
            return  $this->where(['id' => $id])->value('name');
        } catch (Throwable $e) {
            $e->getMessage();
            report($e);
        }
    }
}
