import { TopMargin } from "./Home";
import { useParams } from "react-router-dom";
import { useDeck } from "../context/DeckContext";
import { useState, useEffect } from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import {type Card} from "../types/Card";







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
   


function Practice(){
  const { decks, shuffleMode } = useDeck();
  const {deckId} = useParams();

  const deck = decks.find(d => d.id === deckId);

  if (!deck){
    return (<div> <p>Deck not found</p> <br></br>
              <Link to="/">Home</Link> <br></br>
            </div>);
  }
  
  
  
  const [index, setIndex] = useState(0);
  const [flipCard, setFlipCard] = useState(false);
  const [practiceCards, setPracticeCards] = useState<Card[]>([]);

  //Fisher-Yates shuffle
  function shuffleCards(cards: Card[]) {
    const shuffledDeck = [...cards];

    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    return shuffledDeck;
}

useEffect(() => {
    if (!deck) return;

    if (shuffleMode) {
        setPracticeCards(shuffleCards(deck.cards));
    } else {
        setPracticeCards(deck.cards);
    }

    setIndex(0);
    setFlipCard(false);
}, [deck, shuffleMode]);

  const hasNext = index < practiceCards.length - 1;
  const hasBack = index > 0;


  function handleFlipCard() {
    setFlipCard(!flipCard);
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

  function handleBackClick(){
    if (hasBack) {
      setIndex(index - 1);
      setFlipCard(false);

    } else {
      setIndex(0);
      setFlipCard(false);
    }
  }
  

  let frontCard = "There is no card";
  let backCard = "There is no card";
  if (practiceCards.length > 0) {
    frontCard = practiceCards[index].front;
    backCard = practiceCards[index].back;
    }

   




  

  return (
    <div>
       <div className="mainBody">
      <TopMargin />
    
      <h2>
        <p className="cardText">{flipCard ? backCard : frontCard}</p>
      </h2>
      <div className="practiceButtons">
      <button onClick={handleBackClick}> Back </button>
      <button onClick={handleFlipCard}> Flip </button>
      <button onClick={handleNextClick}> Next </button>
      </div>
      
      <h3>Card {index + 1 } of {practiceCards.length}</h3>
      {/* <button onClick={handleShowTable}> Show Deck </button>
      {showTable && <DisplayDeck cards={cards} />} */}
      
      </div> *
      
      
    </div>
  );

  
}

export default Practice