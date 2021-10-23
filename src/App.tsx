import React, { useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import { Header } from "./components/header/Header";
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
  const [level, setLevel] = useState(1);
  const [orderedCards, setOrderedCards] = useState<TCards>([]);
  const [score, setScore] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const levelHandler = () => {
    setLevel((prev) => (prev += 1));
    console.log("levelHandler", level);
  };
  const scoreHandler = () => {
    setScore((prev) => (prev += 1));
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

  const authHandler = () => {
    console.log("🚀 ~ file: App.tsx ~ line 47 ~ authHandler ~ authHandler");
  };
  return (
    <div className="App">
      <Header
        level={level}
        score={score}
        btnContent={isAuth ? "Logout" : "Login"}
        onClick={authHandler}
      />
      <Board
        orderedCards={orderedCards}
        levelHandler={levelHandler}
        scoreHandler={scoreHandler}
      />
    </div>
  );
}

export default App;
