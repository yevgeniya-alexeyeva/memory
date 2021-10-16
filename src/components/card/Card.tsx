import styles from './card.module.css';

interface IProps {
    animal: string;
    imgSrc: string;
    color: string;
    order: number
    onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export const Card = ({ animal, onClick, imgSrc, color, order }: IProps) => {
     
    return <li className={styles.card}  data-animal={animal} onClick={onClick} style={{order: order}}>
        <img className={styles.frontFace} src={imgSrc} alt={animal} style={{backgroundColor: color}} />
        <div className={styles.backFace}></div>
    </li>
}