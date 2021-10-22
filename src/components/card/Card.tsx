import styles from "./card.module.css";

interface IProps {
  animal: string;
  imgSrc: string;
  color: string;
  order?: number;
  flipClass: string;
  id: string;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export const Card = ({
  animal,
  onClick,
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
      onClick={(e) => onClick(e)}
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
