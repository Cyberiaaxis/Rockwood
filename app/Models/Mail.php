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
     * Add a new mail.
     *
     * @param array $attributes
     * @return int|null
     */
    public function addMail(array $attributes): ?int
    {
        return $this->db->insertGetId($attributes);
    }

    /**
     * Retrieve mails where the provided user ID is the recipient.
     *
     * @param int $toId The ID of the recipient user.
     * @return array|null An array of mails or null if no mails found.
     */
    public function getReceivedMailsByUserId(int $receiverId): ?array
    {
         return $this->db->select('mails.*', 'sender.name as sender_name', 'receiver.name as receiver_name')
            ->join('users as sender', 'mails.sender_id', '=', 'sender.id')
            ->join('users as receiver', 'mails.receiver_id', '=', 'receiver.id')
            ->where('mails.receiver_id', $receiverId)
            ->get()->toArray();
    }

    /**
     * Retrieve mails where the provided user ID is the sender.
     *
     * @param int $fromId The ID of the sender user.
     * @return array|null An array of mails or null if no mails found.
     */
    public function getSentMailsByUserId(int $senderId): ?array
    {
        return $this->db->select('mails.*', 'sender.name as sender_name', 'receiver.name as receiver_name')
            ->join('users as sender', 'mails.sender_id', '=', 'sender.id')
            ->join('users as receiver', 'mails.receiver_id', '=', 'receiver.id')
            ->where('mails.sender_id', $senderId)
            ->get()->toArray();
    }
}

