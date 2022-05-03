import React from "react";
import ky from 'ky';
import {FastField, Form, Formik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {buildFormikErrors} from '../../utils/build-formik-errors.js';
import '../Register/index.css';
import { Link } from 'react-router-dom';


function Login () {
    const navigate = useNavigate();

    return (
        <div className="register_container">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}

                onSubmit={handleSubmit}
            >
                <Form className="sign_form">
                    <h1 className="register_name">Login</h1>
                    <FastField name="email">
                        {({field, meta}) => (
                        <div  className="input_container2">
                            <input {...field} type="text" className="input" placeholder="example@gmail.com"/>
                            {!!meta.error && (
                            <div className="errors">{meta.error}</div>
                            )}
                        </div>
                        )}
                    </FastField>
                    <FastField name="password">
                        {({field, meta}) => (
                        <div  className="input_container2">
                            <input {...field} type="password" className="input" placeholder="*******" />
                            {!!meta.error && (
                            <div className="errors">{meta.error}</div>
                            )}
                        </div>
                        )}
                    </FastField>
                    <button type="submit" class="primary_button">Login</button>
                    <Link to="/register" className="navigate_login">Registrate</Link>    
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