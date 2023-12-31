import { ethers } from "ethers";
import { ABI } from "../contract";
import { useNavigate } from "react-router-dom";

const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter); // no events litened by multiple listeners at the same time
  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);

    cb(parsedLog);
  });
};
export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  setUpdateGameData,
}) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();
  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log("New Player created!", args);

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Player has been successfully created!",
      });
    }
  });
  const NewBattleEventFilter = contract.filters.NewBattle();
  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log("New Battle created and started!", args, walletAddress);

    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
      /* setShowAlert({
        status: true,
        type: "success",
        message: "Player has been successfully created!",
      }); */
      setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
    }
  });
};
