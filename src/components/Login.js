import React from "react";

export default class Login extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h2 className='popup__title popup__title_alternative'>Вход</h2>
        <form className='form form_alternative'>
            <fieldset className='form__item form__item_alternative'>
                <input name='loginEmail' type='email' className='form__input-info form__input-info_alternative' placeholder='Email'></input>
                <input name='loginPassword' type='password' className='form__input-info form__input-info_alternative' placeholder='Пароль'></input>
                <button className='popup__submit-button popup__submit-button_alternative'>Войти</button>
            </fieldset>
        </form>
        </div>
    )}
}