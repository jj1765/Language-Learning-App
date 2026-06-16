import { TopMargin } from "./Home";
import { useParams } from "react-router-dom";
import { useDeck } from "../context/DeckContext";
import { useState } from 'react'
import { Link } from "react-router-dom";
import '../App.css';

function CreateDeck(){
    const {decks} = useDeck();

}

export default function DeckList(){
    const {decks} = useDeck();

    return(
        <div>
            <TopMargin/>
        <p>Select your deck</p>

        {decks.map(deck => (
            <div key={deck.id}>
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </div>
        ))}


        <p>Create a new deck</p>
        
        </div>
    );
}