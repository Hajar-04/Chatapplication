<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent
{
    use Dispatchable, SerializesModels;

    public $message;

    /**
     * Créer une nouvelle instance d'événement.
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Les canaux sur lesquels l'événement sera diffusé.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('channel_for_everyone');
    }
}
