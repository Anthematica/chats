<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ChatResource;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    
    public function index()
    {
        return ChatResource::collection(Chat::with('user')->latest()->paginate());
    }

    
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'receiver_id' => ['required'],
                'sender_id' => ['required'],
                'message' => ['required'],
            ]
        );

        $message = Chat::create($data)->fresh();

        $message->load('user');
        
        return ChatResource::make($message);
    }

   
    public function show(Chat $chat)
    {
        return new ChatResource($chat);
    }

  
    public function update(Request $request, Chat $chat)
    {
        //
    }


    public function destroy(Chat $chat)
    {
        //
    }
}
