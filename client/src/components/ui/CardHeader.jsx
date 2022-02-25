import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "../../actions/CardActions";


const CardHeader = ({ card }) => {
  const [cardTitle, setCardTitle] = useState(card.title);
  const dispatch = useDispatch();

  const handleChangeCardTitle = (e) => {
    setCardTitle(e.target.value)
  }

  const handleSaveNewTitle = () => {
    dispatch(updateCard({ id: card._id, title: cardTitle }))
  };

  const handleKeyPress = e => {
    e.stopPropagation();
    e.preventDefault()
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.target.blur();
    }
  };

  return ( 
    <header>
      <i className="card-icon icon .close-modal"></i>
      <textarea className="list-title" value={cardTitle} onChange={handleChangeCardTitle}
        style={{ height: "45px" }} onBlur={handleSaveNewTitle} onKeyUp={handleKeyPress} >
      </textarea>
      <p>
        in list <a className="link">Stuff to try (this is a list)</a>
        <i className="sub-icon sm-icon"></i>
      </p>
    </header>
  )
}

export default CardHeader;