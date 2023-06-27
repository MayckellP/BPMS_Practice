<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TrackMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $created_at;
    public $confirmedCount;
    public $date_to_produceCount;
    public $date_to_deliverCount;
    public $deliveredCount;
 
    public function __construct( $created_at, $confirmedCount, $date_to_produceCount, $date_to_deliverCount, $deliveredCount)
    {
        $this->created_at = $created_at;
        $this->confirmedCount = $confirmedCount;
        $this->date_to_produceCount = $date_to_produceCount; 
        $this->date_to_deliverCount = $date_to_deliverCount; 
        $this->deliveredCount = $deliveredCount; 
    }


    public function broadcastOn(): array
    {
        return ['companyTrack-channel'];
    }

    public function broadcastAs()
    {
        return 'track-message';
    }
}
