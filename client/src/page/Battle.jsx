import React, { useState, useEffect } from "react";
import { CustomButton, CustomInput, PageHOC, GameLoad } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles";
import { useGlobalContext } from "../context";
import { Alert } from "../components";
import {
  attack,
  attackSound,
  defense,
  defenseSound,
  player01 as player01Icon,
  player02 as player02Icon,
} from "../assets";
import { playAudio } from "../utils/animation";
import { player01, player02 } from "../assets";

const Battle = () => {
  const {
    contract,
    walletAddress,
    showAlert,
    setShowAlert,
    gameData,
    battleGround,
    setBattleGround,
  } = useGlobalContext();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const { battleName } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getPlayerInfo = async () => {
      try {
        let player01Address = null;
        let player02Address = null;
        console.log(
          "gameData.activeBattle.players[0]",
          gameData.activeBattle.players[0]
        );

        if (
          gameData.activeBattle.players[0].toLowerCase() ===
          walletAddress.toLowerCase()
        ) {
          player01Address = gameData.activeBattle.players[0];
          player02Address = gameData.activeBattle.players[1];
          setPlayer1(player01Address);
          setPlayer2(player02Address);
          console.log("player1", player1);
          console.log("player2", player2);
        } else {
          player01Address = gameData.activeBattle.players[1];
          player02Address = gameData.activeBattle.players[0];
          setPlayer1(player01Address);
          setPlayer2(player02Address);
          console.log("player1", player1);
          console.log("player2", player2);
        }
      } catch (error) {}
    };
    if (contract && gameData.activeBattle) getPlayerInfo();
  }, [contract, gameData, battleName]);

  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}
    >
      <h1 className={styles.gameInfoHeading}> {battleName}</h1>

      <div className={`${styles.flexCenter} flex-col`}>
        <img src={player01} className={styles.gameLoadPlayerImg}></img>
        <p className={styles.battleGroundCardText}>{player1}</p>
      </div>
      <h2 className={styles.gameLoadVS}>Vs</h2>
      <div className={`${styles.flexCenter} flex-col`}>
        <img src={player02} className={styles.gameLoadPlayerImg}></img>
        <p className={styles.battleGroundCardText}>{player2}</p>
      </div>
    </div>
  );
};

export default Battle;
