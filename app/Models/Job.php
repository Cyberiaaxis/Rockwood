<?php

namespace App\Models;

use App\Item;
use App\ItemType;
use Illuminate\Database\Eloquent\Model;
use Throwable;

class Job extends Model
{


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function jobNotExists($userId)
    {
        $userdetails = new UserDetail();
        return $userdetails->where('user_id', $userId)->whereNull('job')->exists();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function saveNewJob($userId, $jobId)
    {
        $userdetails = new UserDetail();
        return $userdetails->where('user_id', $userId)->whereNull('job')->update(['job' => $jobId]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function jobLeave($userId)
    {
        $userdetails = new UserDetail();
        return $userdetails->where('user_id', $userId)->update(['job' => null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function transferBenefit($userId, $benefit)
    {
        $userdetails = new UserDetail();
        return $userdetails->where('user_id', $userId)->whereNull('job')->exists();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function getFoods()
    {
        try {
            $itemType = new ItemType();
            return $itemType->where('name', 'food')->get(['id']);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function getTypeAttributes($typeId)
    {
        try {
            $typeId = $typeId->toArray();
            $typeattributes = new TypeAttribute();
            return $typeattributes->whereIn('type_id', $typeId)->get(['id']);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function getItems($ids)
    {
        try {
            $ids = $ids->toArray();
            $items = new Item();
            return $items->whereIn('type_attribute_id', $ids)->get(['id']);
        } catch (Throwable $e) {
            report($e);
            return $e->getMessage();
        }
    }


}
