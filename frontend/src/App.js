import React, { useEffect, useState,createContext } from 'react';
import { Routes, Route  } from 'react-router-dom';
import Home from './components/Home';
import Sign from './components/Sign_';
import Publication from './components/Publication';
import Validation from './components/Validation';
import validation from './truffle_abis/validation.json';
import PageArticle from './components/Validation/PageArticle';
import Team from './components/Team';
import ProjectPage from './components/ProjectPage';
import AuthContext, { useSession } from './hooks/useSession'
import MetamaskContext from './hooks/useMetamask';
import ContractContext from './hooks/useContract';
import Web3 from "web3";
//import { networks } from './truffle-config';

function App() {
  let { loggedUser, setLoggedUser } = useSession();
  const [owner, setOwner] = useState({address:null});
  const [contract, setContract] = useState({Data:null,address:''});
  //console.log('owner address : ', owner);

  async function loadContract(){
    // Instancier une nouvelle instance de Web3
    //connewion au testnet
    const web3 = new Web3('http://localhost:7545');
    const networkId = await web3.eth.net.getId();
    const validationData = validation.networks[networkId];

    // Adresse du contrat

    const contractAddress = validationData.address;
    // ABI (interface du contrat)
    const abi = validation.abi;

    // Instancier le contrat
    const the_contract = new web3.eth.Contract(abi, contractAddress);
    

    setContract({Data:the_contract,address:contractAddress});
   console.log("Contract.address 2 : ", contractAddress);

    
}

//Se connecter au contrat a chaque generation du composant app
useEffect(()=> {
  loadContract();
},[]);



  return (
    <AuthContext.Provider value={{loggedUser, setLoggedUser}}>
      <ContractContext.Provider value={{contract, setContract}}>
        <MetamaskContext.Provider value={{owner, setOwner}}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={loggedUser ? <Home /> : <Sign />} />
            <Route exact path="/publication" element={<Publication />} />
            <Route path="*" element={loggedUser ? <Home /> : <Sign />} />
            <Route path="validation" element={<Validation />} />
            <Route path="validation/pageArticle" element={<PageArticle />} />
            <Route path="team" element={<Team />} />
            <Route path="project" element={<ProjectPage />} />
          </Routes>
        </MetamaskContext.Provider>
      </ContractContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;