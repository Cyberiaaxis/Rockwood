<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Throwable;

/**
 *
 */
trait ModuleStoreTrait
{
    public function store(Request $request, $classname, $imageName = null )
    {
        try {
            $classname = new $classname();
            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ];

            if ($imageName) {
                $data['avatar'] =  $imageName;
            }

            return $classname->updateOrCreate([
                'id' => $request->id
            ], $data);
        } catch (\Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }
}
