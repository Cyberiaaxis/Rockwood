<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class Rank extends Model
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRankById(int $id) : string
    {
       return $this->where(['id' => $id])->value('name');
    }
}
