<?php

namespace App\Models;

/**
 * Class Mail
 *
 * @package App\Models
 *
 * @property int $id
 * @property int $user_id
 * @property string $subject
 * @property string $content
 */
class Mail extends GameBaseModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "mails";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'subject',
        'content'
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
    ];

    /**
     * Retrieve all mails.
     *
     * @return array|null
     */
    public function getAllMails(): ?array
    {
        return $this->db->all();
    }

    /**
     * Retrieve subject and content of mails by user ID.
     *
     * @param int $userId
     * @return array|null
     */
    public function getSubjectWithContentMailByUserId(int $userId): ?array
    {
        return $this->db->where('user_id', $userId)->get()->toArray();
    }

    /**
     * Add a new mail.
     *
     * @param array $attributes
     * @return int|null
     */
    public function addMail(array $attributes): ?int
    {
        return  $this->db->insertGetId($attributes);
    }
}
