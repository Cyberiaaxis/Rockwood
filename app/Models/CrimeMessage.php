<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrimeMessage extends Model
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Crime  $crime
     * @return \Illuminate\Http\Response
     */
    public function message($statusKey, $crimeId)
    {
        return $this->where('message_type', $statusKey)->where('crime_id', $crimeId)->first();
    }

}
