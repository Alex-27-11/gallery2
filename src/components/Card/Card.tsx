import React from "react";
import cl from "./Card.module.scss";
import ArrowCard from "../../assets/images/body/arrowCard.svg";
import { ServerResponse } from "../../models/models";

type CardProps = {
  obj: ServerResponse;
};

const Card: React.FC<CardProps> = ({ obj }) => {
  const { imageUrl, name, created, author, location } = obj;
  return (
    <div className={cl.card}>
      <div className={cl.inner}>
        <div className={cl.boxImgCard}>
          <img
            src={`https://test-front.framework.team/${imageUrl}`}
            alt="img"
            className={cl.imgCard}
          />
        </div>
        <div className={cl.dataMain}>
          <div className={cl.mainLine}></div>
          <div className={cl.paragraphs}>
            <p className={cl.mainName}>{name}</p>
            <p className={cl.mainDate}>{created}</p>
          </div>
          <div className={cl.mainArrow}>
            <img src={ArrowCard} alt="arrow" className={cl.arrowImg} />
          </div>
        </div>
        <div className={cl.dataHidden}>
          <div className={cl.hiddenInner}>
            <p className={cl.hiddenAuthor}>{author}</p>
            <p className={cl.hiddenLocation}>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
