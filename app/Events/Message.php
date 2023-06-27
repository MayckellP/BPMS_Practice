<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $channel;
    public $created_at;
    public $user_id;
 
    public function __construct($message, $channel, $created_at, $user_id)
    {
        $this->message = $message;
        $this->channel = $channel;
        $this->created_at = $created_at;
        $this->user_id = $user_id;
    }


    public function broadcastOn(): array
    {
        return ['company-channel'];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
