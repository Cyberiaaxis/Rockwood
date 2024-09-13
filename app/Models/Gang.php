<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gang extends GameBaseModel
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'avatar',
        'description',
        'status'
    ];

    /**
     * get total posts
     */
    public function getGangNames()
    {
        return  $this->take(10)->orderBy('name')->pluck('name');
    }

    /**
     * get total posts
     */
    public function getGangNameById(int $id)
    {
        return $this->db->where(['id' => $id])->value('name');
    }
}
