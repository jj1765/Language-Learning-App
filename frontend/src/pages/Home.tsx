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
           <Link to="/decks">Decks</Link> <br></br>
           <Link to="/">Home</Link>
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
  const { decks, setDecks } = useDeck();
  
  const deck = decks[0]; //Temporary 
  const cards = deck.cards; //Temporary 
  const [index, setIndex] = useState(0);
  const [flipCard, setFlipCard] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const hasNext = index < cards.length - 1;

  function handleFlipCard() {
    setFlipCard(!flipCard);
  }

  function handleShowAddForm(){
    setShowAddForm(!showAddForm);
  }

  function handleShowTable(){
    setShowTable(!showTable);
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
      setFlipCard(false);

    } else {
      setIndex(0);
      setFlipCard(false);
    }
  }
  function addCard(deckId: string, card: Card){
  setDecks(prev =>
    prev.map(deck => {
      if(deck.id !==deckId){
        return deck;
      }
      return{
        ...deck, cards: [...deck.cards, card]
      };
    })
  );
  }
  function deleteCard(deckId: string, cardId: string){
    setDecks(prev => 
      prev.map(deck => {
        if(deck.id !==deckId){
        return deck;
      }
      return {
        ...deck, cards: deck.cards.filter(c => c.id !== cardId)
      };
      })
    );
  }

  let frontCard = "There is no card";
  let backCard = "There is no card";
  if (cards.length > 0) {
   frontCard = cards[index].front;
   backCard = cards[index].back;
}



  

  return (
    <div>
      <div className="mainBody">
      <TopMargin />
      <button onClick={handleNextClick}> Next </button>
      <h2>
        <p>{flipCard ? backCard : frontCard}</p>
      </h2>
      <button onClick={handleFlipCard}> Flip </button>
      <h3>Card {index + 1 } of {cards.length}</h3>
      
      
      
      <button onClick={handleShowTable}> Show Deck </button>
      {showTable && <DisplayDeck cards={cards} />}
      
      </div>
      

    </div>
  );
  //<button onClick={() => deleteCard(cards[index].id)}>Delete Card</button>
  //<button onClick={handleShowAddForm}> Add a card </button>
  //{showAddForm && <AddCardForm onAdd={addCard} />}
  
}

export default Home