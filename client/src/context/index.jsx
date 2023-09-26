import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ABI, ADDRESS } from "../contract";

import { useNavigate } from "react-router-dom";
const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
  const [walletAdress, setWalletAdress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");

  const updateCurrentWalletAdress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
  };

  useEffect(() => {
    updateCurrentWalletAdress();
  }, []);

  useEffect(() => {
    const setSmartContractandProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.signer();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);
      setProvider(newProvider);
      setContract(newContract);
    };
    setSmartContractandProvider();
  }, []);

  return (
    <GlobalContext.Provider value={{ demo: "test" }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
