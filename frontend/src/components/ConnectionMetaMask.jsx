import React, { useState, useEffect, useContext } from "react";
import "../styles/ConnectionMetaMask.css";
import MetamaskContext from "../hooks/useMetamask";
import ContractContext from "../hooks/useContract";
import validation from '../truffle_abis/validation.json';


import Web3 from "web3";

const ConnectionMetamask = () => {
    const {owner, setOwner} = useContext(MetamaskContext);
    const {contract, setContract} = useContext(ContractContext);

    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.log("error in connection to metamask");
            }
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }

    async function loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setOwner({address:accounts[0]});
        const networkId = await web3.eth.net.getId();
        const validationData = validation.networks[networkId];
        console.log("CONTRACT ADDRESS : ",contract.address);
        console.log(contract.Data.methods);
        console.log("owner address : ",accounts[0]);

    }

    return (
        <div >
            <button className="Connexion-button"
                onClick={async () => {
                    await loadWeb3();
                    await loadBlockchainData();
                }}
            >
                Connection to MetaMask
            </button>
        </div>
    );
};

export default ConnectionMetamask;
