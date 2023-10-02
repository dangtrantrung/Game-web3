import React, { useState, useEffect } from "react";
import { CustomButton, CustomInput, PageHOC } from "../components";
import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { useGlobalContext } from "../context";

const JoinBattle = () => {
  const { contract, battleName, setBattleName } = useGlobalContext();
  const navigate = useNavigate();
  const handleClick = () => {};

  return (
    <>
      <h2 className={styles.joinHeadText}> Available Battles: </h2>
      <p
        className={styles.infoText}
        onClick={() => {
          navigate("/create-battle");
        }}
      >
        {" "}
        Or Create a new Battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Join <br /> a Battle
  </>,
  <>Join already exising Battle and wait for others players to join you</>
);
