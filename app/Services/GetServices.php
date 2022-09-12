<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class GetService
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function getTheData(Model $model, Array $data):Model
    {
        // dd($this->request);
        return $model->updateOrCreate([
            'id' => $this->request->id
        ], $data);
    }
}
