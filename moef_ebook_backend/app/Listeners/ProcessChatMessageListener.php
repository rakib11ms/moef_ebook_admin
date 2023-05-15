<?php

namespace App\Listeners;

use App\Events\ChatMessageEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ProcessChatMessageListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ChatMessageEvent  $event
     * @return void
     */
    public function handle(ChatMessageEvent $event)
    {
          $message = $event->message; 
    }
}
