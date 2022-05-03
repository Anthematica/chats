import '../Home/index.css'

function Contact (props) {
  
    return(
        <div className='contacts' onClick={props.toggle}>
            <div className='profile-info'>
                <div className='profile-photo'>
                    <div className='conected'></div>
                </div>
                <div className='profile-text'>
                    <p className='good_morning'>{props.users}</p>
                    <p className='user_name'>
                        Typing...
                    </p>
                </div>
            </div>
        </div>
       
    );
}

export { Contact };