import React, { ChangeEvent } from "react";
import cl from "./Name.module.scss";

type SelectProps = {
  selected: string;
  placeholder?: string;
  status?: "default" | "invalid";
  onChange?: (selected: string) => void;
  handleClearName?: () => void;
};

const Name: React.FC<SelectProps> = ({
  status = "default",
  placeholder,
  selected,
  onChange,
  handleClearName,
}) => {
  const handleOptionClick = (value: string) => {
    onChange?.(value);
  };

  return (
    <div className={cl.selectWrapper} data-selected={selected !== ""}>
      <div
        className={cl.placeholder}
        data-status={status}
        data-selected={selected !== ""}
        role="button"
        tabIndex={0}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cl.lupe}
        >
          <path
            d="M6.39891 3.95319e-08C5.38042 0.000145857 4.37668 0.243368 3.4711 0.709452C2.56552 1.17554 1.78426 1.85102 1.19224 2.67977C0.60022 3.50852 0.214546 4.46659 0.0672671 5.47437C-0.0800113 6.48215 0.0153602 7.51053 0.345456 8.47403C0.675551 9.43754 1.23084 10.3084 1.96516 11.0141C2.69949 11.7198 3.59165 12.2401 4.5675 12.5317C5.54335 12.8233 6.5747 12.8778 7.57584 12.6907C8.57698 12.5035 9.519 12.0801 10.3236 11.4557L14.6323 15.766C14.7825 15.916 14.9861 16.0002 15.1984 16C15.4107 15.9998 15.6142 15.9154 15.7642 15.7652C15.9142 15.6149 15.9984 15.4113 15.9983 15.199C15.9981 14.9867 15.9137 14.7832 15.7634 14.6332L11.4548 10.3245C12.1892 9.3785 12.6435 8.24539 12.7659 7.05402C12.8883 5.86264 12.674 4.66082 12.1473 3.58522C11.6206 2.50961 10.8026 1.60339 9.78641 0.969593C8.77021 0.335798 7.59655 -0.000133053 6.39891 3.95319e-08ZM1.59904 6.39982C1.59904 5.12682 2.10474 3.90595 3.00489 3.0058C3.90504 2.10565 5.1259 1.59996 6.39891 1.59996C7.67191 1.59996 8.89277 2.10565 9.79292 3.0058C10.6931 3.90595 11.1988 5.12682 11.1988 6.39982C11.1988 7.67283 10.6931 8.89369 9.79292 9.79384C8.89277 10.694 7.67191 11.1997 6.39891 11.1997C5.1259 11.1997 3.90504 10.694 3.00489 9.79384C2.10474 8.89369 1.59904 7.67283 1.59904 6.39982Z"
            fill="#575757"
          />
        </svg>
        <input
          type="text"
          className={cl.input}
          value={selected}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOptionClick(e.target.value)
          }
          placeholder={placeholder}
        />
        {selected !== "" && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cl.cross}
            onClick={handleClearName}
          >
            <path
              d="M0.963679 0.16834C0.743224 -0.0561134 0.385796 -0.0561134 0.165341 0.16834C-0.0551138 0.392794 -0.0551138 0.756705 0.165341 0.981158L3.20166 4.07255L0.307854 7.01884C0.0873987 7.2433 0.0873991 7.60721 0.307854 7.83166C0.528309 8.05611 0.885737 8.05611 1.10619 7.83166L4 4.88537L6.89381 7.83166C7.11426 8.05611 7.47169 8.05611 7.69215 7.83166C7.9126 7.60721 7.9126 7.2433 7.69215 7.01884L4.79834 4.07255L7.83466 0.981158C8.05511 0.756705 8.05511 0.392794 7.83466 0.16834C7.6142 -0.0561134 7.25678 -0.0561134 7.03632 0.16834L4 3.25973L0.963679 0.16834Z"
              fill="#575757"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Name;
