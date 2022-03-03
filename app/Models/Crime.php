<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Crime extends Model
{

    /**
     * Get the comments for the blog post.
     */
    public function messages()
    {
        return $this->hasMany(CrimeMessage::class);
    }

    /**
     * Scope a query to only include crimes of a given type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSubCrimes($query)
    {
        return $query->where('parent_id', $this->id);
    }
    /**
     * Scope a query to only include crimes of a given type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCrimeMessage($query, $crime)
    {
        return $query->where('crime_id', $crime);
    }

    /**
     * Scope a query to only include crimes of a given type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function crimesList($locationId, $userLevel)
    {
        return $this->where('location_id', $locationId)->where('level', $userLevel)->whereNull('parent_id')->get();
    }

    /**
     * Scope a query to only include crimes of a given type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getNerve(int $crimeId) : int
    {
        return $this->where('id', $crimeId)->value('nerve');
    }

    /**
     * Scope a query to only include crimes of a given type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function subCrimeCount($id)
    {
        return $this->where('parent_id', $id)->toSql();
    }


}
