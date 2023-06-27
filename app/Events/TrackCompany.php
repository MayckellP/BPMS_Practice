<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TrackCompany implements ShouldBroadcast
{
    public $orders;
 
    public function __construct($orders)
    {
        $this->orders = $orders; 
    }


    public function broadcastOn(): array
    {
        return ['globalTrack-channel'];
    }

    public function broadcastAs()
    {
        return 'globalTrack-message';
    }
}
