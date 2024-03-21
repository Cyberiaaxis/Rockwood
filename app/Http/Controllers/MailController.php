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
            'from_id' => ['required', 'exists:users,id'],
            'to_id' => ['required', 'exists:users,id'],
            'subject' => ['nullable', 'string'],
            'content' => ['required', 'string', 'max:2000'],
        ];

        // Check if the request has 'from_id' field, add validation rule if present
        if ($request->has('from_id')) {
            $rules['from_id'] = ['required', 'exists:users,id'];
        }

        // Check if the request has 'to_id' field, add validation rule if present
        if ($request->has('to_id')) {
            $rules['to_id'] = ['required', 'exists:users,id'];
        }

        // Check if the request has 'subject' field, add validation rule if present
        if ($request->has('subject')) {
            $rules['subject'] =  ['nullable', 'string'];
        }

        // Check if the request has 'content' field, add validation rule if present
        if ($request->has('content')) {
            $rules['content'] = ['required', 'string', 'max:2000'];
        }

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
        $inboxEmails = $this->mail->getUserFromMailByUserId(auth()->id());

        // Return inbox emails as JSON response
        return response()->json($inboxEmails);
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
       $sentEmails = $this->mail->getUserToMailByUserId(auth()->id());

        // Return sent emails as JSON response
        return response()->json($sentEmails);
    }


    
}
