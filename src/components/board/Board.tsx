import { useState } from "react";
import { Card } from "../card/Card";
import styles from "./board.module.css";
import shortid from "shortid";

type TCard = HTMLLIElement | null;
interface IProps {
  orderedCards: {
    animal: string;
    imageSrc: string;
    color: string;
    order?: number | undefined;
    id: string;
  }[];
  onWin: () => void;
}

export const Board = ({ orderedCards, onWin }: IProps) => {
  const [hasFlippedCard, setFlippedCard] = useState(false);
  const [lockBoard, setLockBoard] = useState(false);
  const [firstCard, setFirstCard] = useState<TCard>(null);
  const [secondCard, setSecondCard] = useState<TCard>(null);
  const [openCards, setOpenCards] = useState<string[]>([]);
  const [clearedCards, setClearedCards] = useState<string[]>([]);

  const flipCard = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (lockBoard) return;

    if (e.currentTarget === firstCard) return;

    if (openCards.length < 2) {
      const id = e.currentTarget.id;
      setOpenCards((prev) => [...prev, id]);
    }

    if (!hasFlippedCard) {
      setFlippedCard(true);

      setFirstCard(e.currentTarget);
      return;
    }

    setSecondCard(e.currentTarget);

    setLockBoard(true);

    checkForMatch(e.currentTarget);
  };

  const checkForMatch = (item: HTMLLIElement) => {
    let isMatch =
      firstCard?.dataset.animal === item.dataset.animal &&
      firstCard?.style.color === item.style.color;
    isMatch ? disableCards(item?.id) : unflipCards();
  };

  const disableCards = (item: string) => {
    if (firstCard) {
      firstCard.style.pointerEvents = "none";
    }
    if (secondCard) {
      secondCard.style.pointerEvents = "none";
    }
    setClearedCards((prev) => [...prev, ...openCards, item]);

    resetBoard();
  };

  const unflipCards = () => {
    setTimeout(() => {
      resetBoard();
    }, 1500);
  };

  const resetBoard = () => {
    setFlippedCard(false);
    setLockBoard(false);
    setFirstCard(null);
    setSecondCard(null);
    setOpenCards([]);
  };
  (function () {
    if (clearedCards.length === orderedCards.length) {
      console.log("win");
      onWin();
    }
  })();

  return (
    <ul className={styles.board}>
      {orderedCards.map((item) => {
        let flip =
          openCards.includes(item.id) || clearedCards.includes(item.id)
            ? styles.flip
            : "";
        return (
          <Card
            key={shortid.generate()}
            id={item.id}
            onClick={flipCard}
            flipClass={flip}
            animal={item.animal}
            imgSrc={item.imageSrc}
            color={item.color}
            order={item.order}
          />
        );
      })}
    </ul>
  );
};
