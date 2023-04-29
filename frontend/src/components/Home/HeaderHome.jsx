import React from "react";

import header_background from "../../assets/header_background.png";

const HeaderHome = () => {
    return (
        <div className="header-home-container">
            <span>SCIBLOCK, LA SOLUTION DONT VOUS AVEZ BESOIN !</span>

            <img
                className="header-home-background"
                src={header_background}
                alt="background image"
            ></img>
        </div>
    );
};

export default HeaderHome;
