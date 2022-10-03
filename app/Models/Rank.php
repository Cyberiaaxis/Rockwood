<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'status'
    ];

    /**
     * Show the ranks list.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRanks()
    {
        return $this->all();
    }

    /**
     * Show the ranks list.
     *
     * @return \Illuminate\Http\Response
     */
    public function storeRank(int $id, array $data)
    {
        return $this->updateOrCreate([
            'id' => $id
        ], $data);
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
