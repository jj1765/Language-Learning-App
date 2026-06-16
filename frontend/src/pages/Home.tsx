import { useState } from 'react'
import hamburgerIcon from '../assets/hamburgerIcon.svg'
import '../App.css';
import { Link } from "react-router-dom";
import {type Card} from "../types/Card";
import {type Deck} from "../types/Deck";
import {useDeck} from "../context/DeckContext";


type AddCardFormProps = {
  onAdd: (card: Card) => void;
};


export function TopMargin(){
  return(
    <div className="topMargin">
        <p></p>
        <p>Flash Card App</p>
        <div className="menuContainer"><IconMenu/></div>
        </div>

  );
}

 function DisplayDeck({cards}: {cards: Card[]}){

   return(<table>
  <thead>
     <tr>
      <th>Number</th>
      <th>Front</th>
      <th>Back</th>
     </tr>
   </thead>

   <tbody>
     {cards.map((card, index) => (
       <tr key={card.id}>
        <td>{index+1}</td>
        <td>{card.front}</td>
        <td>{card.back}</td>
       </tr>
     ))}
   </tbody>
 </table>);
  
  
 }


function AddCardForm({onAdd}: AddCardFormProps){
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  


  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    onAdd({front,back, id: crypto.randomUUID()});
    setFront('');
    setBack('');

  }
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Add a Card</h2>

          <input placeholder="Front" value={front} onChange={(e) => setFront(e.target.value)}></input>
          <input placeholder="Back" value={back} onChange={(e) => setBack(e.target.value)}></input>

          <button type="submit">Add</button>

        </form>
      </div>
    );

  }
  function IconMenu(){
    const [showMenu, setShowMenu] = useState(false);

    function handleShowMenu(){
      setShowMenu(!showMenu);
    }

    function MenuDisplay(){
      return (
        <div className="menuDisplay">
           <Link to="/deckSettings">Deck Settings</Link> <br></br>
           <Link to="/decks">Practice a deck</Link> <br></br>
           <Link to="/">Home</Link> <br></br>
           <Link to="/decksList">Decks List</Link>
        </div>

      );
    }

    return(
      <div>
        <button id="hamburgerButton" onClick={handleShowMenu}><img src={hamburgerIcon} alt="Drop down Menu"></img></button>
        {showMenu && <MenuDisplay />}
      </div>
    )
  }


function Home(){

  return (
    <div>
      <div className="mainBody">
      <TopMargin />
      
      </div>
      

    </div>
  );
  //<button onClick={() => deleteCard(cards[index].id)}>Delete Card</button>
  //<button onClick={handleShowAddForm}> Add a card </button>
  //{showAddForm && <AddCardForm onAdd={addCard} />}
  
}

export default Home