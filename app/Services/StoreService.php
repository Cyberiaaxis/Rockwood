<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class StoreService
{
    // protected $request;

    // public function __construct($request)
    // {
    //     $this->request = $request;
    // }

    public function store(Model $model, Array $data):Model
    {
        // dd($this->request);
        return $model->updateOrCreate([
            'id' => $this->request->id
        ], $data);
    }
}
