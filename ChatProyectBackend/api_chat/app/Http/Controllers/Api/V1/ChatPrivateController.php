<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ChatCollection;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatPrivateController extends Controller
{
    
    public function rooms(Request $request, User $user)
    {
        $auth_id = Auth::id();
        $messages = Chat::query()
            ->with('user', 'sender')
            ->where(function ($query) use ($user, $auth_id) {
                $query->where('sender_id', $auth_id)->where('receiver_id', $user->id);
            })->orWhere(function ($query) use ($user, $auth_id) {
                $query->where('receiver_id', $auth_id)->where('sender_id', $user->id);
            })->get();

        return ChatCollection::make($messages);
    }

}