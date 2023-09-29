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
<<<<<<< HEAD
  const [walletAddress, setWalletAdress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  //Set the wallet address to the state variable
  const updateCurrentWalletAdress = async () => {
    const accounts = await window?.ethereum?.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    if (accounts) setWalletAdress(accounts[0]);
=======
  const [walletAdress, setWalletAdress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");

  const updateCurrentWalletAdress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
>>>>>>> c3fa283117c9c93335041b9d307e39acb578d241
  };

  useEffect(() => {
    updateCurrentWalletAdress();
<<<<<<< HEAD
    window?.ethereum?.on("accountsChanged", updateCurrentWalletAdress);
  }, []);
  //set the smart contract the provider to the state variable
=======
  }, []);

>>>>>>> c3fa283117c9c93335041b9d307e39acb578d241
  useEffect(() => {
    const setSmartContractandProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
<<<<<<< HEAD
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);
      setProvider(newProvider);
      setContract(newContract);
      console.log("signer", signer);
=======
      const signer = newProvider.signer();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);
      setProvider(newProvider);
      setContract(newContract);
>>>>>>> c3fa283117c9c93335041b9d307e39acb578d241
    };
    setSmartContractandProvider();
  }, []);

<<<<<<< HEAD
  //set timer for show alert dialog and message dialog
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [5000]);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider
      value={{ contract, walletAddress, showAlert, setShowAlert }}
    >
=======
  return (
    <GlobalContext.Provider value={{ demo: "test" }}>
>>>>>>> c3fa283117c9c93335041b9d307e39acb578d241
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
