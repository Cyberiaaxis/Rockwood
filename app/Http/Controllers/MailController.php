<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class MailController extends Controller
{
    protected $user;
    protected $mail;

    /**
     * Create a new controller instance.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Mail  $mail
     * @return void
     */
    public function __construct(User $user, Mail $mail)
    {
        $this->user = $user;
        $this->mail = $mail;
    }

    /**
     * Validate incoming request data and perform additional unique validation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function validateAndVerifyRequestData(Request $request): array
    {
        // Define validation rules
        $rules = [
            // 'sender_id' => ['required', 'exists:users,id'],
            'receiver_id' => ['required', 'exists:users,id'],
            'subject' => ['nullable', 'string'],
            'content' => ['required', 'string', 'max:2000'],
        ];

  
        // Validate incoming request data
        $validatedData = $request->validate($rules);

        // Return the validated data
        return $validatedData;
    }

    /**
     * Compose and send an email to the specified user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function composeMail(Request $request)
    {
        // Get users
        $users = $this->user->getUsers();

        // Return users as JSON response
        return response()->json(['users' => $users]);
    }

    /**
     * Store the composed email in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function mailSent(Request $request)
    {
        // Validate and verify request data
        $validatedData = $this->validateAndVerifyRequestData($request);
        $validatedData['sender_id'] = auth()->id();
        $validatedData['created_at'] = now();

        // Add mail to database
        $this->mail->addMail($validatedData);

        // Return success message as JSON response
        return response()->json(['message' => 'Email composed and sent successfully']);
    }

    /**
     * Retrieve inbox emails of the specified user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInbox()
    {
        // Retrieve inbox emails by user ID
        $inboxEmails = $this->mail->getReceivedMailsByUserId(auth()->id());

        // Return inbox emails as JSON response
        return response()->json(['inbox' => $inboxEmails]);
    }

    /**
     * Retrieve sent emails of the specified user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOutbox()
    {

        // Retrieve sent emails by user ID
       $sentEmails = $this->mail->getSentMailsByUserId(auth()->id());

        // Return sent emails as JSON response
        return response()->json(['outbox' => $sentEmails]);
    }


    
}
