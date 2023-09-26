import React from "react";
import { PageHOC } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { demo } = useGlobalContext();
  return (
    <div>
      {/* <h1 className="text-5xl p-3">Avax Gods</h1>
      <h2 className="text-3xl p-3">Web3 NFT Battle-style Card Game</h2>
      <p className="text-xl p-3">Made with 💜 by JavaScript Mastery</p> */}
      <h1 className="text-xl text-white">{demo}</h1>
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
