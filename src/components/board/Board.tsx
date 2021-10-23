import { useState, useEffect } from "react";
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
  levelHandler: () => void;
  scoreHandler: () => void;
}

export const Board = ({ orderedCards, levelHandler, scoreHandler }: IProps) => {
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
    if (isMatch) {
      scoreHandler();
      disableCards();
      setClearedCards((prev) => [...prev, ...openCards, item.id]);
      resetBoard();
    } else {
      unflipCards();
    }
  };

  const disableCards = () => {
    if (firstCard) {
      firstCard.style.pointerEvents = "none";
    }
    if (secondCard) {
      secondCard.style.pointerEvents = "none";
    }
  };

  const unflipCards = () => {
    setTimeout(() => {
      resetBoard();
    }, 1000);
  };

  const resetBoard = () => {
    setFlippedCard(false);
    setLockBoard(false);
    setFirstCard(null);
    setSecondCard(null);
    setOpenCards([]);
  };

  let boardStyle;
  switch (orderedCards.length) {
    case 24:
      boardStyle = styles.boardS;
      break;
    case 36:
      boardStyle = styles.boardM;
      break;
    case 48:
      boardStyle = styles.boardL;
      break;
    case 60:
      boardStyle = styles.boardXL;
      break;
    default:
      boardStyle = styles.boardXS;
  }

  useEffect(() => {
    if (clearedCards.length === orderedCards.length && orderedCards.length) {
      console.log(
        "🚀 ~ file: Board.tsx ~ line 108 ~ useEffect ~ clearedCards.length",
        clearedCards.length
      );

      levelHandler();
      setClearedCards([]);
    }
  }, [orderedCards.length, clearedCards.length, levelHandler]);

  return (
    <ul className={boardStyle}>
      {orderedCards.map((item) => {
        let flip =
          openCards.includes(item.id) || clearedCards.includes(item.id)
            ? styles.flip
            : "";
        let onClick = clearedCards.includes(item.id) ? undefined : flipCard;
        return (
          <Card
            key={shortid.generate()}
            id={item.id}
            onCardClick={onClick}
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
