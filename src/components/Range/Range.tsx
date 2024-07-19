import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import cl from "./Range.module.scss";

type SelectProps = {
  selected: { from: string; to: string };
  placeholder?: { from: string; to: string };
  onChange?: (selected: { from: string; to: string }) => void;
};

const Range: React.FC<SelectProps> = ({
  placeholder = { from: "From", to: "To" },
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const handleOptionClick = (value: { from: string; to: string }) => {
    onChange?.(value);
  };

  const handleHeadClick: MouseEventHandler<HTMLDivElement> = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={cl.range}>
      <div className={cl.inner}>
        <div className={cl.head} onClick={handleHeadClick}>
          <h2 className={cl.title}>Years</h2>
          <div className={cl.crosshair}>
            <div
              className={`${cl.line} ${open ? cl.horizontal : cl.vertical}`}
            ></div>
            <div className={cl.line}></div>
          </div>
        </div>
        {open && (
          <div className={cl.inputBox}>
            <input
              className={cl.rangeInp}
              type="text"
              placeholder={placeholder.from}
              maxLength={4}
              value={selected?.from}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleOptionClick({ ...selected, from: e.target.value })
              }
            />
            <div className={cl.rangeDef}></div>
            <input
              className={cl.rangeInp}
              type="text"
              placeholder={placeholder.to}
              maxLength={4}
              value={selected?.to}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleOptionClick({
                  ...selected,
                  to: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Range;
