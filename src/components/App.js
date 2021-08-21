import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login"
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //Хуки-переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [signinPageActive, setSigninPageActive] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false)

  const [currentUser, setCurrentUser] = React.useState({}); //Хук состояния для рендера информации о профиле
  const [cards, setCards] = React.useState([]); //Хук состояния для добавления карт из начального массива

  React.useEffect(() => {
    api
      .getUserData()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    //Отправка отредактированных данных пользователя на сервер и их рендер на странице
    api
      .editProfileData(data.name, data.about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    //Отправка отредактированного аватара пользователя на сервер и его рендер на странице
    api
      .updateProfileAvatar(data.avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    //Отправка новый карточек на сервер и добавление их в общий массив для рендера
    api
      .postNewCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const restCards = cards.filter((item) => {
          return item._id !== card._id;
        });
        setCards(restCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePageRedirect(){//Изменение состояния переменной при перемещении между страницами приложения
    setSigninPageActive(!signinPageActive)
  }

  function showRegister(registerData){
    console.log(registerData)
  }

// -------------------------------------------------------------------------------
  
  React.useEffect(() => {
    //Хук, отвечающий за закрытие попапов при нажатии на кнопку Escape
    const escCloseHandler = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", escCloseHandler);
    return () => {
      document.removeEventListener("keydown", escCloseHandler);
    };
  }, []);

  React.useEffect(() => {
    //Хук, отвечающий за закрытие попапов при клике на оверлей
    const outerClickCloseHandler = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", outerClickCloseHandler);
    return () => {
      document.removeEventListener("click", outerClickCloseHandler);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div style={{ backgroundColor: "black", minHeight: '100vh' }}>
        <div className="page">
          <div id="#root" className="root">
            <Header loginPage={signinPageActive} redirectHandler={handlePageRedirect} />
            <Switch>
            <Route path='/sign-up'>
              <Register registerData={showRegister} redirectHandler={handlePageRedirect} />
            </Route>

            <Route path='/sign-in'>
              <Login />
            </Route>
            <Route path='/'>
              {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' /> }
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
            </Route>
            </Switch>
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            textOnButton="Да"
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
