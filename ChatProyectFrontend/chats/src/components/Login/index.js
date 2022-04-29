import React from "react";
import ky from 'ky';
import {FastField, Form, Formik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {buildFormikErrors} from '../../utils/build-formik-errors.js';


function Login () {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Welcome to the Login page!</h2>
            <p>You can do this, I believe in you.</p>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}

                onSubmit={handleSubmit}
            >
                <Form>
                    <h1>Login</h1>
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
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );

    
    async function handleSubmit(values, formikBag) {
        const resp = await ky
            .post(`${process.env.REACT_APP_API_URL}/login`, {
                json: values,
                throwHttpErrors: false,
            }).json();

        if (resp.errors) {
            const errors = buildFormikErrors(resp.errors)

            formikBag.setErrors(errors)

            return
        }

        localStorage.setItem('access_token', resp.access_token)

        navigate('/')
    }

}

export { Login };