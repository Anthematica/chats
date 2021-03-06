import '../Home/index.css'

function Profile (props) {
    return(
        <div className='profile-info'>
        <div className='profile-photo'>
            <div className='conected'></div>
        </div>
        <div className='profile-text'>
            <p className='good_morning'>{props.contact?.name}</p>
            <p className='user_name'>
                Last seen recently
            </p>
        </div>
        </div>
    );
}

export { Profile };