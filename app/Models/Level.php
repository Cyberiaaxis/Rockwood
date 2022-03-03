<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class Level extends Model
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLevelById(int $levelId): string
    {
        return $this->where('id', $levelId)->value('name');
    }
}
