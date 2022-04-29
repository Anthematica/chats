import React from "react";
import {FastField, Form, Formik} from 'formik';
import ky from 'ky';
import {useNavigate} from 'react-router-dom';

import {buildFormikErrors} from '../../utils/build-formik-errors.js'

function Register () {
    const navigate = useNavigate()
    return (
        <div>
            <h2>Welcome to the Register page!</h2>
            <p>You can do this, I believe in you.</p>
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    password: '',
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <h1>Register</h1>
                    <FastField name="name">
                        {({field, meta}) => (
                        <div>
                            <input {...field} type="text" />
                            {!!meta.error && (
                            <div>{meta.error}</div>
                            )}
                        </div>
                        )}
                    </FastField>
                    <FastField name="email">
                        {({field, meta}) => (
                        <div>
                            <input {...field} type="text" />
                            {!!meta.error && (
                            <div className="text-red-500">{meta.error}</div>
                            )}
                        </div>
                        )}
                </FastField>
                <FastField name="password">
                    {({field, meta}) => (
                    <div>
                        <input {...field} type="password" />
                        {!!meta.error && (
                        <div className="text-red-500">{meta.error}</div>
                        )}
                    </div>
                    )}
                </FastField>
                <button type="submit">Create</button>
                </Form>
            </Formik>
        </div>
    );

    async function handleSubmit(values, formikBag) {
        const resp = await ky.post(`${process.env.REACT_APP_API_URL}/register`, {
            json: values,
            throwHttpErrors: false,
        }).json();
    
        if (resp.errors) {
            const errors = buildFormikErrors(resp.errors);
    
            formikBag.setErrors(errors);
    
            return
        }
    
        localStorage.setItem('access_token', resp.access_token);
    
        navigate('/');
    }
}

export { Register };