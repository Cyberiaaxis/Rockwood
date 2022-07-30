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
        'name', 'image'
    ];

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
