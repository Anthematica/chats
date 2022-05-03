import '../Home/index.css'

function LoginUser (props) {
    return(
        <div className='profile-info'>
        <div className='profile-photo'>
            <div className='conected'></div>
        </div>
        <div className='profile-text'>
            <p className='good_morning'>Good morning!</p>
            <p className='user_name'>
                {props.user?.name}
            </p>
        </div>
        </div>
    );
}

export { LoginUser };