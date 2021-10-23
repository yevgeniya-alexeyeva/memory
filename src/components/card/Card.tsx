import styles from "./card.module.css";

interface IProps {
  animal: string;
  imgSrc: string;
  color: string;
  order?: number;
  flipClass: string;
  id: string;
  onCardClick:
    | ((e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void)
    | undefined;
}

export const Card = ({
  animal,
  onCardClick,
  imgSrc,
  color,
  flipClass,
  order,
  id,
}: IProps) => {
  return (
    <li
      className={`${styles.card} ${flipClass}`}
      id={id}
      data-animal={animal + color}
      onClick={onCardClick}
      style={{ order: order }}
    >
      <img
        className={styles.frontFace}
        src={imgSrc}
        alt={animal}
        style={{ backgroundColor: color }}
      />
      <div className={styles.backFace}></div>
    </li>
  );
};
