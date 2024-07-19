import React, { useEffect, useState } from "react";
import cl from "./Main.module.scss";
import { ServerResponse } from "../../models/models";
import Card from "../Card/Card";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import { getPagesArray } from "../../utils/pages";

const Main: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesArr, setPagesArr] = useState<number[]>([]);
  const [dataMain, setDataMain] = useState<ServerResponse[]>([]);
  const [pagesView, setPagesView] = useState(true);

  useEffect(() => {
    if (totalCount === 0) {
      return;
    }
    setTotalPages(Math.ceil(totalCount / 12));
    setPagesArr(getPagesArray(totalPages));
  }, [totalCount, totalPages]);

  return (
    <section className={cl.main}>
      <div className="container">
        <div className={cl.container}>
          <div className={cl.inner}>
            <div className={cl.navigation}>
              <Search
                page={page}
                onChange={setDataMain}
                changeTotalCount={setTotalCount}
                setPagesView={setPagesView}
              />
            </div>
            <div className={cl.paintings}>
              {dataMain?.map((item) => {
                return <Card key={item.id} obj={item} />;
              })}
            </div>
            {pagesView && (
              <div className={cl.pagination}>
                <Pagination numbers={pagesArr} page={page} setPage={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
