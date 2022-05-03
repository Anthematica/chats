<?php

namespace App\Events;

use App\Http\Resources\V1\ChatResource;
use App\Models\Chat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

   public $message;

    public function __construct(Chat $message)
    {
        $message->load('user', 'sender');

        $this->message = ChatResource::make($message);
    }

   
    public function broadcastOn()
    {
        return new Channel('chat');
    }

    public function broadcastAs (){
        $arr = [$this->message->sender_id, $this->message->receiver_id];
        sort($arr);
        return "chatsent-".$arr[0]."-".$arr[1];  
    }
}
