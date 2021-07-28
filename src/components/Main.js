import React from 'react';
import {api} from '../utils/Api.js'
import Card from './Card.js'

function Main(props) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState()
    const [cards, setCards] = React.useState([])

    React.useEffect(()=>{
        Promise.all([api.getInitialCards(), api.getUserData()]).then(([cards, info]) => {
            //Добавление информации о профиле с сервера
            setUserName(info.name)
            setUserDescription(info.about)
            setUserAvatar(info.avatar)
            
            setCards(cards)//Добавление карточек из массива с сервера
              }).catch((err) => {
                console.log(err)
              });
    }, [])

  return (
<main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt=""></img>
                </div>
                
                <div className="profile__container">
                    <div className="profile__subcontainer">
                        <h1 className="profile__title">{userName}</h1>
                        <p className="profile__subtitle">{userDescription}</p>
                        <button onClick={props.onEditProfile} type="button" aria-label="Отредактировать профиль"
                            className="profile__edition-button button-effects"></button>
                    </div>
                    <button type="button" aria-label="Добавить" id="add" onClick={props.onAddPlace}
                        className="profile__add-button button-effects"></button>
                </div>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card, i) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                    ))}
                </ul>
            </section>
        </main>
  );
}

export default Main;