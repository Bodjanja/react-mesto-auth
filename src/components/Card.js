import React from 'react';

function Card(props){

    function handleClick() {
        props.onCardClick(props.card);
        // console.log(props.card)
      }

    return(
        <li className="element">
                <img className="element__image" src={props.card.link} alt="" onClick={handleClick}/>
                <div className="element__container">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__subcontainer"><button type="button" aria-label="Поставить лайк" className="element__icon"></button>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                    </div>
                </div>
                <button type="button" aria-label="Удалить карточку" id="removebutton"
                    className="element__bin button-effects"></button>
            </li>
    )
}

export default Card