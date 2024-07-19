import React from "react";
import cl from "./Buttons.module.scss";

type ButtonsProps = {
  send: () => void;
  clear: () => void;
  hideButtons?: boolean;
};

const Buttons: React.FC<ButtonsProps> = ({ send, clear, hideButtons }) => {
  return (
    <div className={cl.buttons}>
      <div className={cl.inner}>
        <button className={cl.button} onClick={send}>
          <span>Show the results</span>
        </button>
        <button
          className={
            hideButtons ? `${cl.button} ${cl.buttonHide}` : `${cl.button}`
          }
          onClick={clear}
        >
          <span>clear</span>
          {hideButtons && <div className={cl.hideButtons}></div>}
        </button>
      </div>
    </div>
  );
};

export default Buttons;
