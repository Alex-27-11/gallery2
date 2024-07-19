import React from "react";
import cl from "./Pagination.module.scss";

type Props = {
  numbers: number[];
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ numbers, page, setPage }) => {
  const addPage = (pag: number) => {
    setPage(pag);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < numbers.length) setPage(page + 1);
  };

  const renderPageButtons = () => {
    const isPrevEllipsisNeeded = page > 3;
    const isNextEllipsisNeeded = page < numbers.length - 2;

    return (
      <>
        {page !== 1 && page !== 2 && (
          <button
            key="first-page"
            className={cl.button}
            onClick={() => addPage(1)}
          >
            1
          </button>
        )}

        {isPrevEllipsisNeeded && (
          <button
            key="prev-ellipsis"
            className={cl.button}
            onClick={() => addPage(page - 2)}
          >
            ...
          </button>
        )}

        {(page === 1 || page === 2) &&
          numbers.slice(0, 4).map((pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === page ? cl.buttonActive : cl.button}
              onClick={() => addPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        {page !== 1 &&
          page !== 2 &&
          page !== numbers.length &&
          page !== numbers.length - 1 &&
          page !== numbers.length - 2 && (
            <>
              <button
                key={page - 1}
                className={cl.button}
                onClick={() => addPage(page - 1)}
              >
                {page - 1}
              </button>
              <button
                key={page}
                className={cl.buttonActive}
                onClick={() => addPage(page)}
              >
                {page}
              </button>
              <button
                key={page + 1}
                className={cl.button}
                onClick={() => addPage(page + 1)}
              >
                {page + 1}
              </button>
            </>
          )}

        {page >= numbers.length - 2 &&
          numbers.slice(-4).map((pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === page ? cl.buttonActive : cl.button}
              onClick={() => addPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

        {isNextEllipsisNeeded && (
          <button
            key="next-ellipsis"
            className={cl.button}
            onClick={() => addPage(page + 2)}
          >
            ...
          </button>
        )}

        {page !== numbers.length &&
          page !== numbers.length - 1 &&
          page !== numbers.length - 2 && (
            <button
              key="last-page"
              className={cl.button}
              onClick={() => addPage(numbers.length)}
            >
              {numbers.length}
            </button>
          )}
      </>
    );
  };

  return (
    <div className={cl.pagination}>
      <div className={cl.inner}>
        <button className={cl.buttonArr} onClick={handlePrev}>
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.68774 0.283494C7.51288 0.0697714 7.19787 0.0382703 6.98415 0.213134L0.384147 5.61313C0.268079 5.7081 0.200766 5.85015 0.200766 6.00011C0.200766 6.15008 0.268079 6.29213 0.384147 6.38709L6.98415 11.7871C7.19787 11.962 7.51288 11.9305 7.68774 11.7167C7.86261 11.503 7.83111 11.188 7.61739 11.0131L1.49036 6.00011L7.61739 0.987091C7.83111 0.812228 7.86261 0.497216 7.68774 0.283494Z"
              fill="#575757"
            />
          </svg>
        </button>
        {numbers.length > 5 && renderPageButtons()}
        {numbers.length <= 5 &&
          numbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === page ? cl.buttonActive : cl.button}
              onClick={() => addPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

        <button className={cl.buttonArr} onClick={handleNext}>
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.312255 0.283494C0.487119 0.0697714 0.80213 0.0382703 1.01585 0.213134L7.61585 5.61313C7.73192 5.7081 7.79923 5.85015 7.79923 6.00011C7.79923 6.15008 7.73192 6.29213 7.61585 6.38709L1.01585 11.7871C0.80213 11.962 0.487119 11.9305 0.312255 11.7167C0.137391 11.503 0.168893 11.188 0.382615 11.0131L6.50964 6.00011L0.382615 0.987091C0.168892 0.812228 0.137391 0.497216 0.312255 0.283494Z"
              fill="#575757"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
