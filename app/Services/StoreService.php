<?php

namespace App\Services;

use Throwable;

class StoreService
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function store($data)
    {
        try {
            return $this->model->updateOrCreate([
                'id' => $this->request->id
            ], $data);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    public function setModel($model)
    {
        $this->model = $model;
        return $this->model;
    }
}
