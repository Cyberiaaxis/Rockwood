<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class AttackLog extends Model
{
    /**
     * get a Area name instance.
     * @param  $id INT
     * @return name string
     */
    public function addLog($log)
    {
        return $this->insert(['attackLog' => $log]);
    }

    /**
     * got number of fight as a defender escaped from storage.
     * @param  $userId INT
     * @return escaped_defender INT
     */
    public function attackEvents()
    {
        return  $this->take(mt_rand(2, 10))->pluck('attack_logs');
    }
}
