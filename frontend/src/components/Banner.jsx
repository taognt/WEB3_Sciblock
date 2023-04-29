import "../styles/Banner.css";
import icon_signin from "../assets/icon_signin.png";

import { Link } from "react-router-dom";
import AuthContext from "../hooks/useSession";
import { useContext } from "react";
import ConnectionMetamask from "./ConnectionMetaMask";
import ContractContext from "../hooks/useContract";
import MetamaskContext from "../hooks/useMetamask";

const Banner = () => {
    const { setLoggedUser } = useContext(AuthContext);
    const { contract, setContract } = useContext(ContractContext);
    const { owner, setOwner } = useContext(MetamaskContext);

    const logout = () => {
        setLoggedUser(null);
    };

    console.log("owner : ", owner.address);
    return (
        <div className="banner">
            <div>
                <Link to="/" className="banner-logo">
                    SCIBLOCK
                </Link>
                <div className="banner-nav-meta">
                    <span>Addresse du contract : {contract.address}</span>
                </div>

                {owner.address && (
                    <div className="banner-nav-meta">
                        <span>Addresse du wallet : {owner.address}</span>
                    </div>
                )}
            </div>

            <div className="banner-nav-links">
                <Link to="/project" className="banner-nav-link">
                    Découvrir le projet
                </Link>
                <Link to="/team" className="banner-nav-link">
                    Découvrir l'équipe
                </Link>
            </div>

            {!owner.address && (
                <div className="banner-metamask">
                    <ConnectionMetamask />
                </div>
            )}

            <Link to="/signin">
                <div className="banner-signin" onClick={logout}>
                    <img
                        src={icon_signin}
                        alt="icon sign in"
                        className="banner-icon_signin"
                    />
                </div>
            </Link>
        </div>
    );
};

export default Banner;
