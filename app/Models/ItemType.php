<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class ItemType extends Model
{
    protected $table = 'item_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 'id','name' ];

    // public function categories()
    // {
    //     return $this->belongsTo(Category::class);
    // }

    public function items()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getItemTypes()
    {
        return $this->all();
    }
}
