import React, { useState } from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const handleClick = async () => {
    try {
      console.log(contract);
      console.log("contract name", contract.address);
      console.log("player address " + walletAddress);

      const playerExists = await contract.isPlayer(walletAddress);

      console.log("playerExists", playerExists);
      if (!playerExists) {
        console.log("playername: " + playerName);

        await contract.registerPlayer(playerName, playerName);
        console.log("playername: " + playerName);
        //show alert message
        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });
      } else {
        setShowAlert({
          status: true,
          type: "info",
          message:
            `${playerName} is already exist, with Account at Address: ` +
            walletAddress,
        });
      }
    } catch (error) {
      console.log(error);
      //show alert message
      setShowAlert({
        status: true,
        type: "failure",
        message: error.message,
      });
    }
  };
  return (
    /*  <div className="flex flex-col">
      <h1 className="text-5xl p-3">Avax Gods</h1>
      <h2 className="text-3xl p-3">Web3 NFT Battle-style Card Game</h2>
      <p className="text-xl p-3">Made with 💜 by JavaScript Mastery</p>
      <h1 className="text-xl text-white">{demo}</h1>
    </div> */
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeHolder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton
        title="Register"
        handleClick={handleClick}
        restType="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    {" "}
    Connect your Wallet to start playing <br /> the Ultimate Web3 Battle Card
    Game
  </>
);
