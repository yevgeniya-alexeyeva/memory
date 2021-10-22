import React, { useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import { cardsData } from "./utils/cards";
import shortid from "shortid";

type TCards = {
  animal: string;
  imageSrc: string;
  color: string;
  order?: number | undefined;
  id: string;
}[];

function App() {
  const [level, setLevel] = useState(2);
  const [orderedCards, setOrderedCards] = useState<TCards>([]);

  const onWin = () => {
    setLevel((prev) => prev++);
  };
  useEffect(() => {
    const getCardsSet = () => {
      let cards: TCards = [];

      for (let i = 1; i <= level; i++) {
        let color = i % 2 === 0 ? "#f7ef7b" : "#7bf7cd";
        //isOdd
        cards = cards.concat(
          [...cardsData, ...cardsData].map((item) => {
            item.order = Math.floor(Math.random() * 12 * level);
            item.id = shortid.generate();
            item.color = color;
            return { ...item };
          })
        );
      }
      return cards;
    };

    setOrderedCards(getCardsSet());
  }, [setOrderedCards, level]);

  return (
    <div className="App">
      <Board orderedCards={orderedCards} onWin={onWin} />
    </div>
  );
}

export default App;
