import styles from "./header.module.css";
interface IProps {
  score: number;
  level: number;
  btnContent: string;
  onClick: () => void;
}

export const Header = ({ score, level, btnContent, onClick }: IProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.score}> Score: {score}</div>
      <h2 className={styles.level}>Level {level}</h2>
      <button className={styles.authBtn} onClick={onClick}>
        {btnContent}
      </button>
    </header>
  );
};
