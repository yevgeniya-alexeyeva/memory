import bear from "../images/bear.png";
import owl from "../images/owl.png";
import elk from "../images/elk.png";
import hedgehog from "../images/hedgehog.png";
import rabbit from "../images/rabbit.png";
import raccoon from "../images/raccoon.png";


interface ICard {
  animal: string;
  imageSrc: string;
  color: string;
  order?: number;
  id: string;
}
//#f7ef7b
export const cardsData:ICard[] = [
  {
    animal: "bear",
    imageSrc: bear,
    color: "#7bf7cd",
    id: '',
  },
  {
    animal: "owl",
    imageSrc: owl,
    color: "#7bf7cd",
    id: '',
  },
  {
    animal: "elk",
    imageSrc: elk,
    color: "#7bf7cd",
    id: '',
  },
  
  {
    animal: "hedgehog",
    imageSrc: hedgehog,
    color: "#7bf7cd",
    id: '',
  },
 
  {
    animal: "rabbit",
    imageSrc: rabbit,
    color: "#7bf7cd",
    id: '',
  },
  {
    animal: "racoon",
    imageSrc: raccoon,
    color: "#7bf7cd",
    id: '',
  },
];
