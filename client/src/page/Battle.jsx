import React, { useState, useEffect } from "react";
import {
  CustomButton,
  CustomInput,
  PageHOC,
  GameLoad,
  Card,
  ActionButton,
  PlayerInfo,
  GameInfo,
} from "../components";
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
import { player01 as player01img, player02 as player02img } from "../assets";

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
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
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
        const p1TokenData = await contract.getPlayerToken(player01Address);
        const p2TokenData = await contract.getPlayerToken(player02Address);
        const player01 = await contract.getPlayer(player01Address);
        const player02 = await contract.getPlayer(player02Address);
        //player information
        const p1Att = p1TokenData.attackStrength.toNumber();
        const p1Def = p1TokenData.defenseStrength.toNumber();
        const p1H = player01.playerHealth.toNumber();
        const p1M = player01.playerMana.toNumber();

        /* const p2Att = p2TokenData.attackStrength.toNumber();
        const p2Def = p2TokenData.defenseStrength.toNumber(); */
        const p2H = player02.playerHealth.toNumber();
        const p2M = player02.playerMana.toNumber();

        setPlayer1({
          ...player01,
          att: p1Att,
          def: p1Def,
          health: p1H,
          mana: p1M,
        });
        setPlayer2({
          ...player02,
          att: X,
          def: X,
          health: p2H,
          mana: p2M,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (contract && gameData.activeBattle) getPlayerInfo();
  }, [contract, gameData, battleName]);

  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}
    >
      {/*  <h1 className={styles.gameInfoHeading}> {battleName}</h1>

      <div className={`${styles.flexCenter} flex-col`}>
        <img src={player01img} className={styles.gameLoadPlayerImg}></img>
        <p className={styles.battleGroundCardText}>{player1}</p>
      </div>
      <h2 className={styles.gameLoadVS}>Vs</h2>
      <div className={`${styles.flexCenter} flex-col`}>
        <img src={player02img} className={styles.gameLoadPlayerImg}></img>
        <p className={styles.battleGroundCardText}>{player2}</p>
      </div> */}
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <PlayerInfo player={player2} playerIcon={player02Icon} mt />
      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card card={player2} title={player2?.playerName} cardRef="" playerTwo />

        <div className="flex items-center flex-row">
          <ActionButton
            imgUrl={attack}
            handeClick={() => {}}
            restStyles="mr-2 hover:border-yellow-400"
          />
          <Card
            card={player1}
            title={player1?.playerName}
            cardRef=""
            restStyles="mt-3"
          />
          <ActionButton
            imgUrl={defense}
            handeClick={() => {}}
            restStyles="ml-6 hover:border-red-600"
          />
        </div>
      </div>
      <PlayerInfo player={player1} playerIcon={player01Icon} mt />
      <GameInfo />
    </div>
  );
};

export default Battle;
