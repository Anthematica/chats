import { ReceiverBubble } from '../ChatBubble/ReceiverBubble.js';
import {Profile} from '../Profile';

function ReceiverChat({contact}) {

    return(
        <div className="receiver_chat_container">
             <Profile contact ={contact}></Profile>
            <ReceiverBubble></ReceiverBubble>
            <ReceiverBubble></ReceiverBubble>
            <ReceiverBubble></ReceiverBubble>
            <ReceiverBubble></ReceiverBubble>
        </div>
    );
}

export { ReceiverChat };