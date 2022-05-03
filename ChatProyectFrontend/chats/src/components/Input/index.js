import './index.css';
import ky from 'ky';
import {FastField, Form, Formik} from 'formik';
import { buildFormikErrors } from '../../utils/build-formik-errors'

function Input ({contactInfo, logUser}) {
    console.log("Reserver:",contactInfo);
    console.log("Sender", logUser);
    return(
        <div className="input_container">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.6667 14.6667C21.7712 14.6667 22.6667 13.7713 22.6667 12.6667C22.6667 11.5621 21.7712 10.6667 20.6667 10.6667C19.5621 10.6667 18.6667 11.5621 18.6667 12.6667C18.6667 13.7713 19.5621 14.6667 20.6667 14.6667Z" fill="#ADADAD"/>
                <path d="M11.3333 14.6667C12.4379 14.6667 13.3333 13.7713 13.3333 12.6667C13.3333 11.5621 12.4379 10.6667 11.3333 10.6667C10.2288 10.6667 9.33333 11.5621 9.33333 12.6667C9.33333 13.7713 10.2288 14.6667 11.3333 14.6667Z" fill="#ADADAD"/>
                <path d="M15.9867 2.66669C8.62667 2.66669 2.66667 8.64002 2.66667 16C2.66667 23.36 8.62667 29.3334 15.9867 29.3334C23.36 29.3334 29.3333 23.36 29.3333 16C29.3333 8.64002 23.36 2.66669 15.9867 2.66669ZM16 26.6667C10.1067 26.6667 5.33333 21.8934 5.33333 16C5.33333 10.1067 10.1067 5.33335 16 5.33335C21.8933 5.33335 26.6667 10.1067 26.6667 16C26.6667 21.8934 21.8933 26.6667 16 26.6667ZM21.88 18.52C21.4133 18.2267 20.7867 18.3734 20.5067 18.84C19.52 20.4 17.84 21.3334 16 21.3334C14.16 21.3334 12.48 20.4 11.4933 18.8267C11.2 18.36 10.5867 18.2134 10.12 18.5067C9.65333 18.8 9.50667 19.4134 9.8 19.88C11.16 22.0534 13.4667 23.3334 16 23.3334C18.5333 23.3334 20.84 22.04 22.2 19.8934C22.4933 19.4267 22.3467 18.8134 21.88 18.52Z" fill="#ADADAD"/>
            </svg>
            <svg width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="32" fill="#C4C4C4"/>
            </svg>
            <Formik
                initialValues = {{
                    receiver_id: '',
                    sender_id: '',
                    message:'',
                }}
                
                onSubmit={handleSubmit}
            >
                <Form className='input_form'>
                    <FastField name='message'>
                        {({field, meta}) => (
                            <div className='chat_error_container'>
                                <input {...field} name='message' type="text" placeholder='Type your message here...' className='chat_input' />   
                                {!!meta.error && (
                                    <div>{meta.error}</div>
                                )}
                            </div>
                           
                        )}
                        
                    </FastField>
                    
                    <button type="submit" className='chat_input_button'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.4354 0.581983C18.9352 0.0685981 18.1949 -0.122663 17.5046 0.0786645L1.408 4.75952C0.679698 4.96186 0.163487 5.54269 0.0244302 6.28055C-0.117628 7.0315 0.378575 7.98479 1.02684 8.38342L6.0599 11.4768C6.57611 11.7939 7.24238 11.7144 7.66956 11.2835L13.4329 5.4843C13.723 5.18231 14.2032 5.18231 14.4934 5.4843C14.7835 5.77623 14.7835 6.24935 14.4934 6.55134L8.71999 12.3516C8.29181 12.7814 8.21178 13.4508 8.52691 13.9702L11.6022 19.0538C11.9623 19.6577 12.5826 20 13.2628 20C13.3429 20 13.4329 20 13.513 19.9899C14.2933 19.8893 14.9135 19.3558 15.1436 18.6008L19.9156 2.52479C20.1257 1.84028 19.9356 1.09537 19.4354 0.581983Z" fill="white"/>
                        </svg>
                    </button>
                </Form>
            </Formik>
        </div>
    );

    async function  handleSubmit(values, formikBag) {
        const resp = await ky.post(`${process.env.REACT_APP_API_URL}/v1/chats`, {
            json: {...values, sender_id:logUser.id, receiver_id: contactInfo.id }
        }).json();

        if (resp.errors) {
            const errors = buildFormikErrors(resp.errors);

            formikBag.setErrors(errors);

            return
        }
    } 
}

export { Input };