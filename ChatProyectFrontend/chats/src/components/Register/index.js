import React from "react";
import {FastField, Form, Formik} from 'formik';
import ky from 'ky';
import {useNavigate} from 'react-router-dom';
import './index.css';
import { Link } from 'react-router-dom';

import {buildFormikErrors} from '../../utils/build-formik-errors.js'

function Register () {
    const navigate = useNavigate()
    return (
        <div className="register_container">
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    password: '',
                }}
                onSubmit={handleSubmit}
            >
                <Form className="sign_form">
                    <h1 className="register_name">Register</h1>
                    <FastField name="name">
                        {({field, meta}) => (
                        <div className="input_container2">
                            <input {...field} type="text" className="input" placeholder="Ingrese su nombre"/>
                            {!!meta.error && (
                            <div className="errors">{meta.error}
                            </div>
                            )}
                        </div>
                        )}
                    </FastField>
                    <FastField name="email">
                        {({field, meta}) => (
                        <div className="input_container2">
                            <input {...field} type="text"  className="input" placeholder="example@gmail.com"/>
                            {!!meta.error && (
                            <div className="errors">{meta.error}</div>
                            )}
                        </div>
                        )}
                </FastField>
                <FastField name="password">
                    {({field, meta}) => (
                    <div className="input_container2">
                        <input {...field} type="password"  className="input" placeholder="*******"/>
                        {!!meta.error && (
                        <div className="errors">{meta.error}</div>
                        )}
                    </div>
                    )}
                </FastField>
                <div className="input_container2">
                    <button type="submit" class="primary_button">Create</button>
                </div>
                      <Link to="/login" className="navigate_login">¿Ya tienes una cuenta?</Link>      
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