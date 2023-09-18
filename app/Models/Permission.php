<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as ModelsPermission;

class Permission extends ModelsPermission
{

    /**
     * Show the ranks list.
     *
     * @return \Illuminate\Http\Response
     */
    public function getListPermissions()
    {
        return $this->all();
    }

    /**
     * Show the ranks list.
     *
     * @return \Illuminate\Http\Response
     */
    public function storePermission(int $id, array $data)
    {
        return $this->updateOrCreate([
            'id' => $id
        ], $data);
    }
    protected function getDefaultGuardName(): string
    {
        return 'web';
    }
}
