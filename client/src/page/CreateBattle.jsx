import React, { useState, useEffect } from "react";
import { CustomButton, CustomInput, PageHOC, GameLoad } from "../components";
import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { useGlobalContext } from "../context";

const CreateBattle = () => {
  const { contract, battleName, setBattleName, gameData } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;
    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
      console.log("gameData.activeBattle", gameData.activeBattle);
      console.log("gamedata", gameData);
    }
  }, [gameData]);

  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        {" "}
        <CustomInput
          label="Battle"
          placeHolder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        ></CustomInput>{" "}
        <CustomButton
          title="Create Battle"
          handleClick={handleClick}
          restType="mt-6"
        ></CustomButton>
        <p
          className={`${styles.infoText} mt-6`}
          onClick={() => navigate("/join-battle")}
        >
          {" "}
          Or Join already existing battles
        </p>
      </div>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own Battle and wait for others players to join you</>
);
