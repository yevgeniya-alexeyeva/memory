import { useState } from 'react';
import { Card } from '../card/Card';
import { cardsData } from '../../utils/cards';
import styles from './board.module.css';
import shortid from 'shortid';



type TCard = HTMLLIElement | null

const orderedCards = cardsData.map(item => {
  item.order = Math.floor(Math.random() * 12);
return item})
console.log("🚀 ~ file: Board.tsx ~ line 14 ~ orderedCards", orderedCards)
 
export const Board = () => {
    const [hasFlippedCard, setFlippedCard] = useState(false);
    const [lockBoard, setLockBoard] = useState(false);
    const [firstCard, setFirstCard] = useState<TCard>(null);
    const [secondCard, setSecondCard] = useState<TCard>(null);

    
  const flipCard = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (lockBoard) return;

    if (e.currentTarget === firstCard) return;

    e.currentTarget.classList.add(styles.flip);
  
    if (!hasFlippedCard) {
      setFlippedCard(true);
      setFirstCard(e.currentTarget);
     
      return;
    }
  
    setSecondCard(e.currentTarget);
    setLockBoard(true);

    checkForMatch();
  }

  const checkForMatch = () => {
    let isMatch = firstCard?.dataset.animal === secondCard?.dataset.animal;
    isMatch ? disableCards() : unflipCards();
  }

  const disableCards =() => {
  if(firstCard)
    { firstCard.style.pointerEvents = "none"; }
    if(secondCard)
  {secondCard.style.pointerEvents = "none";}
   
    resetBoard();
  }

 const unflipCards = () => {
    setTimeout(() => {
      firstCard?.classList.remove(styles.flip);
      secondCard?.classList.remove(styles.flip);

      resetBoard();
    }, 1500);
  }

  const resetBoard = () => {
    setFlippedCard(false);
    setLockBoard(false);
    setFirstCard(null);
    setSecondCard(null);
  }

  return (<ul className={styles.board}>{orderedCards.map(item => <Card key={shortid.generate()} onClick={flipCard} animal={item.animal} imgSrc={item.imageSrc} color={item.color} order={ item.order}/>)}</ul>)
}