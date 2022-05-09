import { ReceiverBubble } from '../ChatBubble/ReceiverBubble.js';
import {Profile} from '../Profile';

function ReceiverChat({contact, recieverChat }) {
    return(
        <div className="receiver_chat_container">
             <Profile contact ={contact}></Profile>
                <ReceiverBubble message = {recieverChat}></ReceiverBubble>
        </div>
    );
}

export { ReceiverChat };