import { createContext, useContext, useEffect, useState } from "react";

const DeckContext = createContext('Deck');

export function DeckGetter({children}){
    const [deck, setDeck] = useState([]);

    
}