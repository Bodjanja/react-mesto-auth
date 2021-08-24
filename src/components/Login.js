import React from "react";
import * as auth from '../utils/auth'

export default function Login(props){

    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')

    function handleEmailChange(e){
        setEmail(e.target.value)
    }

    function handlePasswordChange(e){
        setPassword(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        auth.login(password, email)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            if (res.token) {
                localStorage.setItem('token', res.token)
                props.loginHandler()
                props.tokenCheck()
                return res;
            } else {
                return;
            }
        })
        .catch((err) => console.log(err));

    }

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h2 className='popup__title popup__title_alternative'>Вход</h2>
        <form className='form form_alternative' onSubmit={handleSubmit}>
            <fieldset className='form__item form__item_alternative'>
                <input name='loginEmail' type='email' className='form__input-info form__input-info_alternative' placeholder='Email' onChange={handleEmailChange}></input>
                <input name='loginPassword' type='password' className='form__input-info form__input-info_alternative' placeholder='Пароль' onChange={handlePasswordChange}></input>
                <button className='popup__submit-button popup__submit-button_alternative'>Войти</button>
            </fieldset>
        </form>
        </div>
    )}