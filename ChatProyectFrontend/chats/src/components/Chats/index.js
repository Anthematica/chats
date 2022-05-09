import './index.css';
import { Profile } from '../Profile';
import { Input } from '../Input';
import {ReceiverChat} from '../ReceiverChat';
import { SentChat } from '../SentChat';
import {useEffect, useState} from 'react';
import ky from 'ky';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { buildFormikErrors } from '../../utils/build-formik-errors'


window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '973fbdfbefd566e93f53',
    cluster: 'mt1',
    forceTLS: true
});

function Chats ({contact, logUser}) {
    const [chats, setChats] = useState([]);

    useEffect(()=> {
        const eventName = `.chatsent-${[logUser.id, contact.id].sort().join('-')}`
        const channel = window.Echo.channel('chat')
    
        channel.listen(eventName, (e) => {
            setChats(chats => ([...chats, e.message]));
        });

        return () => {
            channel.stopListening('eventName')
            window.Echo.leaveChannel('chat');
        }
    },[]);
    

    useEffect(() => {
        (async function chats () {
            const resp = await ky.get(`${process.env.REACT_APP_API_URL}/v1/chats`).json()
            setChats(resp.data);
        })();
    }, []);

    //Chats entre dos personas 
    useEffect(()=> {
        const access_token = localStorage.getItem('access_token');
        (async function privatChats () {
            const resp = await ky.get(`${process.env.REACT_APP_API_URL}/v1/chatsPrivados/${contact.id}`, {  
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            }).json();
            console.log('Consulta entre dos personas', resp.data);
            setChats(resp.data);
        })();
    }, [contact.id]);

    return(
        <div className="chats_container">
            <div className='chat_contact_info'>
                <Profile contact ={contact}></Profile>
                <div className="profile-icons">
                        {/* <div>
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55059 14.6012C11.1684 14.6012 14.1012 11.6684 14.1012 8.05059C14.1012 4.4328 11.1684 1.5 7.55059 1.5C3.9328 1.5 1 4.4328 1 8.05059C1 11.6684 3.9328 14.6012 7.55059 14.6012Z" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.6254 13.1247L16.7427 17.242" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.50002 4H10V5.5C10 5.9125 10.3375 6.25 10.75 6.25C11.1625 6.25 11.5 5.9125 11.5 5.5V4H13C13.4125 4 13.75 3.6625 13.75 3.25C13.75 2.8375 13.4125 2.5 13 2.5H11.5V1C11.5 0.5875 11.1625 0.25 10.75 0.25C10.3375 0.25 10 0.5875 10 1V2.5H8.50002C8.08752 2.5 7.75002 2.8375 7.75002 3.25C7.75002 3.6625 8.08752 4 8.50002 4ZM12.4075 9.4525L10.5025 9.235C10.045 9.1825 9.59502 9.34 9.27252 9.6625L7.89252 11.0425C5.77002 9.9625 4.03002 8.23 2.95002 6.1L4.33752 4.7125C4.66002 4.39 4.81752 3.9325 4.76502 3.4825L4.54752 1.5925C4.46502 0.835 3.82002 0.2575 3.06252 0.2575H1.76502C0.917523 0.2575 0.212523 0.9625 0.265023 1.81C0.662523 8.215 5.78502 13.33 12.1825 13.7275C13.03 13.78 13.735 13.075 13.735 12.2275V10.93C13.7425 10.18 13.165 9.535 12.4075 9.4525Z" fill="#ADADAD"/>
                            </svg>
                        </div>
                        <div>
                            <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 9C0 9.39556 0.117298 9.78224 0.337061 10.1111C0.556824 10.44 0.869181 10.6964 1.23463 10.8478C1.60009 10.9991 2.00222 11.0387 2.39018 10.9616C2.77814 10.8844 3.13451 10.6939 3.41421 10.4142C3.69392 10.1345 3.8844 9.77814 3.96157 9.39018C4.03874 9.00222 3.99913 8.60008 3.84776 8.23463C3.69638 7.86918 3.44004 7.55682 3.11114 7.33706C2.78224 7.1173 2.39556 7 2 7C1.46957 7 0.96086 7.21071 0.585787 7.58579C0.210714 7.96086 0 8.46957 0 9ZM0 16C0 16.3956 0.117298 16.7822 0.337061 17.1111C0.556824 17.44 0.869181 17.6964 1.23463 17.8478C1.60009 17.9991 2.00222 18.0387 2.39018 17.9616C2.77814 17.8844 3.13451 17.6939 3.41421 17.4142C3.69392 17.1345 3.8844 16.7781 3.96157 16.3902C4.03874 16.0022 3.99913 15.6001 3.84776 15.2346C3.69638 14.8692 3.44004 14.5568 3.11114 14.3371C2.78224 14.1173 2.39556 14 2 14C1.46957 14 0.96086 14.2107 0.585787 14.5858C0.210714 14.9609 0 15.4696 0 16ZM0 2C0 2.39556 0.117298 2.78224 0.337061 3.11114C0.556824 3.44004 0.869181 3.69638 1.23463 3.84776C1.60009 3.99913 2.00222 4.03874 2.39018 3.96157C2.77814 3.8844 3.13451 3.69392 3.41421 3.41421C3.69392 3.13451 3.8844 2.77814 3.96157 2.39018C4.03874 2.00222 3.99913 1.60008 3.84776 1.23463C3.69638 0.869181 3.44004 0.556824 3.11114 0.337061C2.78224 0.117298 2.39556 0 2 0C1.46957 0 0.96086 0.210714 0.585787 0.585787C0.210714 0.960859 0 1.46957 0 2Z" fill="#121212"/>
                            </svg>
                        </div> */}
                </div>
            </div>
            <div className='chats_container_main'>
                {chats.map((item) => {
                    if (logUser.id === item.sender_id?.id) {

                        return (
                            <SentChat senderChat={item}></SentChat>
                            
                        );
                    }
                    return(
                        <ReceiverChat contact= {contact} recieverChat={item}></ReceiverChat>
                    );
                })

                }
                
            </div>
            
            <Input handleSubmit={handleSubmit}></Input>
        </div>
       
    );


    async function handleSubmit (values, formikBag) {
        const resp = await ky.post(`${process.env.REACT_APP_API_URL}/v1/chats`, {
            json: {...values, sender_id:logUser.id, receiver_id: contact.id }
        }).json();
       
        if (resp.errors) {
            const errors = buildFormikErrors(resp.errors);

            formikBag.setErrors(errors);

            return
        }

        setChats([...chats, resp.data]);

        
    }

    
}

export {Chats};