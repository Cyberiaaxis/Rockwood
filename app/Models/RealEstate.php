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
        'id', 'name', 'description', 'image'
    ];

    /**
     * get the RealEstate list.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRealEstate()
    {
        return $this->all();
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Rank  $rank
     * @return updateOrCreate result
     */
    public function realEstateStore(array $data)
    {
        return $this->updateOrCreate([
            'id' => $data['id'],
        ], $data);
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
