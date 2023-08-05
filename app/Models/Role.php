<?php

namespace App\Models;

use Spatie\Permission\Models\Role as ModelsRole;

class Role extends ModelsRole
{

    /**
     * Show the ranks list.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRoles()
    {
        return $this->with('permissions')->get();
    }

    /**
     * Show the ranks list.
     *
     * @return \Illuminate\Http\Response
     */
    public function storeRole(array $data)
    {
        // dd($data);
        return $this->updateOrCreate([
            'id' => $data['id'],
        ], $data);
    }
}
