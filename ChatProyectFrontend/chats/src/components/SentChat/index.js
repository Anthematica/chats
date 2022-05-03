import {SenderBubble } from '../ChatBubble/SenderBubble.js';
import './index.css';

function SentChat () {
    return (
        <div className='bubble_chat_right_sender'>
            <SenderBubble></SenderBubble>
            <SenderBubble></SenderBubble>
            <SenderBubble></SenderBubble>
            <SenderBubble></SenderBubble>
        </div>
    ); 
}

export { SentChat };