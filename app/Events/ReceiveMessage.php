<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use App\PersonalChatroom;


class ReceiveMessage
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {

            $room = PersonalChatroom::where('room_id', $this->payload['room_id'])->first();
            $receiver_id = 0;
            if ($room) {
                if ($room['first_user'] == Auth::user()->id) {
                    $receiver_id = $room['second_user'];
                } else {
                    $receiver_id = $room['first_user'];
                }
            }

            return new PrivateChannel('user.' . $receiver_id);
      
    }
}
