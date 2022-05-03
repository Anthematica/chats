import ky from 'ky';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import {Profile} from '../Profile';
import {Contact} from '../Contact';
import {Chats} from '../Chats';
import {LoginUser} from '../LoginUser';

function Home () {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [contact, setContact] = useState([]);

        //Traer todos los usuarios
    useEffect(() => {
        (async function listUsers(){
            const resp = await ky.get(`${process.env.REACT_APP_API_URL}/v1/users`).json();
            setUsers(resp.data);
          
        })();

            
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        ky.get(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .json()
        .then((resp) => {
            setUser(resp);
        })
        .catch((err) => {
            localStorage.removeItem('access_token');
            navigate('/login');
        })
        .finally(() => {
            setLoading(false);
        });

    }, [navigate]);

    if (loading) {
        return <div>Loading app..</div>
    }
    
    if (!user) {
        return null
    }
    const userLog = users.filter((i) => i.id !== user.id);
    return (
        <div className='home_container'>
            <section className='left_chat'>
                <div className="user-profile">
                    {user && <LoginUser user={user}></LoginUser>}
                    <div className="profile-icons">
                        <div>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.688 7.988H7.84V12.956H5.296V7.988H0.448V5.684H5.296V0.715999H7.84V5.684H12.688V7.988Z" fill="#ADADAD"/>
                            </svg>
                        </div>
                        <div>
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99999 15.5C6.82499 15.5 7.49999 14.825 7.49999 14H4.49999C4.49999 14.825 5.16749 15.5 5.99999 15.5ZM10.5 11V7.25C10.5 4.9475 9.26999 3.02 7.12499 2.51V2C7.12499 1.3775 6.62249 0.875 5.99999 0.875C5.37749 0.875 4.87499 1.3775 4.87499 2V2.51C2.72249 3.02 1.49999 4.94 1.49999 7.25V11L0.532493 11.9675C0.0599928 12.44 0.389993 13.25 1.05749 13.25H10.935C11.6025 13.25 11.94 12.44 11.4675 11.9675L10.5 11Z" fill="#ADADAD"/>
                            </svg>
                        </div>
                        <div>
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55059 14.6012C11.1684 14.6012 14.1012 11.6684 14.1012 8.05059C14.1012 4.4328 11.1684 1.5 7.55059 1.5C3.9328 1.5 1 4.4328 1 8.05059C1 11.6684 3.9328 14.6012 7.55059 14.6012Z" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.6254 13.1247L16.7427 17.242" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div className='contacts_container'>
                        {userLog.map((item)=> {
                            return (
                                <Contact users={item.name} toggle={() => toggleContact(item)}>

                                </Contact>
                            );
                        })}
                </div>
                <button onClick={handleLogout} className='logoutButton'>Logout</button>
            </section>
                {toggle && 
                    <Chats contact={contact} logUser={user}></Chats>
                }
            
        </div>
        
    );

 
    function toggleContact (item) {
        setToggle(true);
        setContact(item);
    }

    function handleLogout() {
        localStorage.removeItem('access_token');
    
        navigate('/login');
    }
}

export { Home };    