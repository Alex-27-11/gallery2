import { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";
import Styles from "./AuthorOrLoc.module.scss";

interface Option {
  id: number;
  name?: string;
  location?: string;
}

type OptionProps<T extends Option> = {
  option: T;
  onClick: (value: T) => void;
};

const OptionEl = <T extends Option>(props: OptionProps<T>) => {
  const {
    option: { name, location, id },
    onClick,
  } = props;

  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: T): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  useEffect(() => {
    const optionE = optionRef.current;
    if (!optionE) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === optionE && event.key === "Enter") {
        onClick({ name, location, id } as T);
      }
    };

    optionE.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      optionE.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [id, onClick]);

  return (
    <li
      className={Styles.option}
      value={id}
      onClick={handleClick({ name, location, id } as T)}
      tabIndex={0}
      ref={optionRef}
    >
      {location || name || ""}
    </li>
  );
};
//  ====================================================
type SelectProps<T extends Option> = {
  title: string;
  selected: T | null;
  options: T[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  status?: "default" | "invalid";
  onChange?: (selected: T | null) => void;
  onClose?: () => void;
};

const Select = <T extends Option>(props: SelectProps<T>) => {
  const {
    title,
    options,
    placeholder,
    status = "default",
    selected,
    onChange,
    onClose,
    searchTerm,
    setSearchTerm,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        if (isOpen) onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!selected) {
      setSearchTerm("");
    }
  }, [selected]);

  const handleOptionClick = (value: T) => {
    setIsOpen(false);
    onChange?.(value);
    value.location && setSearchTerm(value.location);
    value.name && setSearchTerm(value.name);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  const handleHeadClick: MouseEventHandler<HTMLDivElement> = () => {
    setOpen((prev) => !prev);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value.toLowerCase();
    setSearchTerm(newTerm);

    function searchOptions() {
      const filteredOptions = options.filter((option) => {
        if (
          option.name &&
          option.name.toLowerCase() === searchTerm.toLowerCase()
        ) {
          return onChange?.({ id: option.id, name: searchTerm } as T);
        } else if (
          option.location &&
          option.location.toLowerCase() === searchTerm.toLowerCase()
        ) {
          return onChange?.({ id: option.id, location: searchTerm } as T);
        }
        if (onChange) {
          onChange(null);
        }
        return false;
      });

      if (filteredOptions.length > 0) {
        const matchedOption = filteredOptions[0];
        if (onChange) {
          onChange(matchedOption);
        }
      }
    }

    searchOptions();

    if (options) {
      if (!newTerm) {
        setFilteredOptions(options);
        return;
      }

      setFilteredOptions(
        options.filter((option) => {
          const optionName = option.name?.toLowerCase() || "";
          const optionLocation = option.location?.toLowerCase() || "";

          return (
            optionName.includes(newTerm) || optionLocation.includes(newTerm)
          );
        })
      );
    }
  };

  return (
    <div className={Styles.select}>
      <div className={Styles.inner}>
        <div className={Styles.head} onClick={handleHeadClick}>
          <h2 className={Styles.title}>{title}</h2>
          <div className={Styles.crosshair}>
            <div
              className={`${Styles.line} ${open ? Styles.horizontal : Styles.vertical}`}
            ></div>
            <div className={Styles.line}></div>
          </div>
        </div>
        {open && (
          <div
            className={Styles.selectWrapper}
            ref={rootRef}
            data-is-active={isOpen}
            data-selected={!!selected?.id}
          >
            <div className={Styles.arrow} onClick={handlePlaceHolderClick}>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={Styles.arrowSvg}
              >
                <path
                  d="M6 6L0.803848 0.75L11.1962 0.749999L6 6Z"
                  fill="#575757"
                />
              </svg>
            </div>
            <input
              placeholder={placeholder}
              type="text"
              value={searchTerm}
              className={Styles.placeholder}
              data-status={status}
              data-selected={!!selected?.id}
              onClick={handlePlaceHolderClick}
              onChange={handleSearchChange}
              tabIndex={0}
              ref={placeholderRef}
            />
            {isOpen && (
              <ul className={Styles.select}>
                {filteredOptions &&
                  filteredOptions.map((option) => (
                    <OptionEl
                      key={option.id}
                      option={option}
                      onClick={handleOptionClick}
                    />
                  ))}
                {filteredOptions.length == 0 && (
                  <li
                    className={`${Styles.option} ${filteredOptions.length == 0 && Styles.noMatching}`}
                  >
                    There are no matching results for your query.
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
