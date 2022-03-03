<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class RealEstate extends Model
{
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
