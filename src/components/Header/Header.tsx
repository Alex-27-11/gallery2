import React, { useState } from "react";
import LogoL from "../../assets/images/header/logoL.svg";
import LogoD from "../../assets/images/header/logoD.svg";
import Sun from "../../assets/images/header/sun.svg";
import Moon from "../../assets/images/header/moon.svg";
import cl from "./Header.module.scss";

const HeadAI: React.FunctionComponent = () => {
  const [toggle, setToggle] = useState(false);

  const toggleTheme = () => {
    setToggle(!toggle);
    const root = document.documentElement;
    if (root.hasAttribute("theme")) {
      root.removeAttribute("theme");
    } else {
      root.setAttribute("theme", "dark");
    }
  };

  return (
    <header className={cl.header}>
      <div className="container">
        <div className={cl.inner}>
          <div className={cl.boxLogo}>
            {toggle ? (
              <img src={LogoD} alt="Logo" className={cl.logo} />
            ) : (
              <img src={LogoL} alt="Logo" className={cl.logo} />
            )}
          </div>
          <button className={cl.btn} type="button" onClick={toggleTheme}>
            {toggle ? (
              <img src={Sun} alt="Sun" className={cl.iconBtn} />
            ) : (
              <img src={Moon} alt="Moon" className={cl.iconBtn} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeadAI;
