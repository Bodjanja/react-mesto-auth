import React from 'react';
import logo from '../logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {
    //Хуки-переменные состояния, отвечающие за видимость попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(true)
    }

    function handleCardClick(card){
        setSelectedCard(card)
    }

    function closeAllPopups(){
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    }

    React.useEffect(()=>{//Хук, отвечающий за закрытие попапов при нажатии на кнопку Escape
        const escCloseHandler = (evt) => {
            if (evt.key === 'Escape') {
            closeAllPopups()
          }
    }
        document.addEventListener('keydown', escCloseHandler)
    return () => {
        document.removeEventListener('keydown', escCloseHandler)
    }
    })

    React.useEffect(()=>{//Хук, отвечающий за закрытие попапов при клике на оверлей
        const outerClickCloseHandler = (evt) =>{
            if(evt.target.className.includes('popup')){
                closeAllPopups()
            }
        }
        document.addEventListener('click', outerClickCloseHandler)
        return () => {
            document.removeEventListener('click', outerClickCloseHandler)
        }
    })


  return (
    <div style={{backgroundColor: 'black'}}>
    <div className="page">
    <div id="#root" className="root">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer />
    </div>
<PopupWithForm name="type_profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" textOnButton="Сохранить">
                     <input id="username" name="name" type="text" className="form__input-info form__input-info_type_name" required
                        placeholder="Введите имя" minLength="2" maxLength="40"></input>
                        <span className="form__input-info-error" id="username-error"></span>
                    <input id="description" name="description" type="text"
                        className="form__input-info form__input-info_type_description" required
                        placeholder="Введите описание" minLength="2" maxLength="200"></input>
                        <span className="form__input-info-error" id="description-error"></span>
</PopupWithForm>

<PopupWithForm name="type_addition" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" textOnButton="Создать">
                    <input id="newplace" name="additionName" className="form__input-info form__input-info_type_place" type="text"
                        placeholder="Название" required minLength="2" maxLength="30"></input>
                    <span className="form__input-info-error" id="newplace-error"></span>
                    <input id="newplaceimg" name="additionPhoto" className="form__input-info form__input-info_type_image" type="url"
                        placeholder="Ссылка на картинку" required></input>
                        <span className="form__input-info-error" id="newplaceimg-error"></span>
</PopupWithForm>

<PopupWithForm name="avatar-update" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" textOnButton="Сохранить">
                    <input name="updateAvatar" id="avatar" className="form__input-info form__input-info_type_avatar" type="url"
                    placeholder="Ссылка на аватар" required></input>
                    <span className="form__input-info-error" id="avatar-error"></span>
</PopupWithForm>

<PopupWithForm name="confirmation" title="Вы уверены?">

</PopupWithForm>

<PopupWithImage card={selectedCard} onClose={closeAllPopups} />



    <div className="popup popup_confirmation">
        <div className="popup__container">
            <form name="confirmDeleteCard" className="popup__form popup__form_confirmation" noValidate>
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="popup__submit-button popup__submit-button_type_confirmation" value="confirm"
            aria-label="Подтвердить удаление карточки">Да</button>
            <button type="button" aria-label="Закрыть редактирование"
                className="popup__close popup__close_type_confirmation"></button>
            </form>
        </div>
    </div>
    </div>
    </div>
  );
}

export default App;
