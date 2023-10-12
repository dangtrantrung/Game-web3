import React from "react";
import styles from "../styles";

const ActionButton = ({ imgUrl, handelClick, restStyles }) => {
  return (
    <div
      className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect}${restStyles}`}
    >
      <img
        src={imgUrl}
        alt="action_img"
        className={styles.gameMoveIcon}
        onClick={handelClick}
      />
    </div>
  );
};

export default ActionButton;
