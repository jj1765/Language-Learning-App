import { createContext, useContext, useEffect, useState, type ReactNode, } from "react";
import { type Deck} from "../types/Deck";

type DeckContextType = {
  decks: Deck[];
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
};

const DeckContext = createContext<DeckContextType | null>(null);

//Need this to render anything below deckcontext in app.tsx
type DeckProviderProps = {
    children: ReactNode;
}

export function DeckProvider({children}: DeckProviderProps){
    const [decks, setDecks] = useState<Deck[]>([]);

    //useEffect runs the function on startup
    useEffect(() => {
        const savedDecks = localStorage.getItem("decks");
        if (savedDecks){
            setDecks(JSON.parse(savedDecks));

        }

    }, []);

    //This useEffect alters the saved data of decks whenever it is altered. Runs the return first then the function
    useEffect(() => {
        localStorage.setItem("decks", JSON.stringify(decks));
    }, [decks]);

    return(
        <DeckContext.Provider value={{decks, setDecks}}>{children}</DeckContext.Provider>
    );
    
}

export function useDeck() {
    const context = useContext(DeckContext);

    if (!context) {
        throw new Error("useDeck must be used inside a DeckProvider");
    }

    return context;
}