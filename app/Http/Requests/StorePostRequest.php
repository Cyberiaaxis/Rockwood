<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // dd($this);
        return [
            'name' =>  ['required',  'unique:jobs,name,' . $this->id],
            'image' => ['nullable', 'sometimes', 'mimes:jpg,jpeg,bmp,png'],
            'status' => 'boolean',
            'description' => ['nullable', 'sometimes', 'string']
        ];
    }
}
