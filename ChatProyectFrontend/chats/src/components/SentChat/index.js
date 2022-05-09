import {SenderBubble } from '../ChatBubble/SenderBubble.js';
import './index.css';

function SentChat ({senderChat}) {
    return (
        <div className='bubble_chat_right_sender'>
            <SenderBubble senderChat= {senderChat}></SenderBubble>
        </div>
    ); 
}

export { SentChat };