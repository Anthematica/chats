import './index.css';

function SenderBubble ({senderChat}) {
    return(
      <div className="chat_bubble_container bubble_right">
              <p>{senderChat.message}</p>
      </div>  
    );
}

export { SenderBubble };