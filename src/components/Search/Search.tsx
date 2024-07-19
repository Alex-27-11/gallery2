import React, { useEffect, useState } from "react";
import cl from "./Search.module.scss";
import Name from "../Name/Name";
import AuthorOrLoc from "../AuthorOrLoc/AuthorOrLoc";
import Buttons from "../Buttons/Buttons";
import Range from "../Range/Range";
import {
  useAllAuthorsQuery,
  useAllLocationsQuery,
  useAllPaintingsQuery,
  useLazySearchNamesQuery,
  useLazySortAuthorsQuery,
  useLazySortYearsQuery,
} from "../../store/paintings/paintings.api";
import { updateData } from "../../utils/updateData";
import { ServerResponse } from "../../models/models";

type SearchProps = {
  page: number;
  onChange: (value: ServerResponse[]) => void;
  changeTotalCount: (value: number) => void;
  setPagesView: (bl: boolean) => void;
};

const Search: React.FC<SearchProps> = ({
  page,
  onChange,
  changeTotalCount,
  setPagesView,
}) => {
  const [hideClear, setHideClear] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [noName, setNoName] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [searchAuthor, setSearchAuthor] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    id: number;
    location: string;
  } | null>(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedYears, setSelectedYears] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });

  const { data, isLoading, isError } = useAllPaintingsQuery(page);
  const {
    data: dataAuthors,
    isError: isErrorAut,
    isLoading: isLoadingAut,
  } = useAllAuthorsQuery("");
  const {
    data: dataLocations,
    isError: isErrorLoc,
    isLoading: isLoadingLoc,
  } = useAllLocationsQuery("");
  const [fetchAuthors, { data: dataAutSort }] = useLazySortAuthorsQuery();
  const [fetchLocations, { data: dataLocSort }] = useLazySortAuthorsQuery();
  const [fetchYears, { data: dataYearsSort }] = useLazySortYearsQuery();
  const [fetchNames, { data: dataNames }] = useLazySearchNamesQuery();

  useEffect(() => {
    if (data?.totalCount) changeTotalCount(data.totalCount);
  }, [data]);

  useEffect(() => {
    if (selectedAuthor) {
      fetchAuthors({ page: page, id: selectedAuthor.id });
      setSelectedLocation(null);
      setSearchLocation("");
      setSelectedYears({
        from: "",
        to: "",
      });
      setSelectedName("");
    }
  }, [selectedAuthor]);

  useEffect(() => {
    if (selectedLocation) {
      fetchLocations({ page: page, id: selectedLocation.id });
      setSelectedAuthor(null);
      setSearchAuthor("");
      setSelectedYears({
        from: "",
        to: "",
      });
      setSelectedName("");
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedYears.from !== "" && selectedYears.to !== "") {
      fetchYears({
        page: page,
        from: selectedYears.from,
        to: selectedYears.to,
      });
      setSelectedName("");
      setSelectedAuthor(null);
      setSelectedLocation(null);
      setSearchAuthor("");
      setSearchLocation("");
    }
  }, [selectedYears.from, selectedYears.to]);

  useEffect(() => {
    if (selectedName !== "") {
      fetchNames({ page: page, name: selectedName });
      setSelectedYears({
        from: "",
        to: "",
      });
      setSelectedAuthor(null);
      setSelectedLocation(null);
      setSearchAuthor("");
      setSearchLocation("");
      setPagesView(false);
    } else {
      setPagesView(true);
    }
    if (dataAuthors && dataLocations) {
      if (selectedName && dataNames) {
        onChange(updateData(dataNames, dataAuthors, dataLocations));
      }
    }
    if (selectedName && dataNames?.length === 0) setNoName(true);
    if (selectedName && dataNames?.length) setNoName(false);
    if (!selectedName) setNoName(false);
  }, [selectedName, dataNames]);

  useEffect(() => {
    if (
      !selectedAuthor &&
      !selectedLocation &&
      selectedYears.from === "" &&
      selectedYears.to === "" &&
      selectedName === "" &&
      searchAuthor === "" &&
      searchLocation === ""
    ) {
      if (data && dataAuthors && dataLocations)
        onChange(updateData(data.apiResponse, dataAuthors, dataLocations));
      setHideClear(true);
      setPagesView(true);
    } else {
      setHideClear(false);
      setPagesView(false);
    }
  }, [
    selectedAuthor,
    selectedLocation,
    selectedYears,
    selectedName,
    page,
    data,
    dataAuthors,
    dataLocations,
    searchAuthor,
    searchLocation,
  ]);

  const handleHeadButtonClick = () => {
    setIsOpen(true);
  };

  const handleImgCloseClick = () => {
    setIsOpen(false);
  };

  const handleSend = () => {
    if (dataAuthors && dataLocations) {
      if (selectedAuthor && dataAutSort)
        onChange(updateData(dataAutSort, dataAuthors, dataLocations));
      if (location && dataLocSort)
        onChange(updateData(dataLocSort, dataAuthors, dataLocations));
      if (selectedYears.from !== "" && selectedYears.to !== "" && dataYearsSort)
        onChange(updateData(dataYearsSort, dataAuthors, dataLocations));
    }
  };

  const handleClear = () => {
    setSelectedAuthor(null);
    setSelectedLocation(null);
    setSelectedYears({ from: "", to: "" });
    setSearchAuthor("");
    setSearchLocation("");
  };

  const handleClearName = () => {
    setSelectedName("");
  };

  return (
    <section className={cl.search}>
      <div className={cl.inner}>
        <div className={cl.head}>
          <Name
            placeholder="Painting title"
            selected={selectedName}
            onChange={setSelectedName}
            handleClearName={handleClearName}
          />
          <button className={cl.headButton} onClick={handleHeadButtonClick}>
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2 0.5C13.3 0.5 12.7 1 12.5 1.7H0.6C0.2 1.7 0 1.9 0 2.3C0 2.7 0.2 2.9 0.6 2.9H12.4C12.6 3.6 13.4 4.1 14.1 4.1C15.1 4.1 15.9 3.3 15.9 2.3C16 1.3 15.1 0.5 14.2 0.5ZM14.2 2.9C13.8 2.9 13.6 2.7 13.6 2.3C13.6 1.9 13.8 1.7 14.2 1.7C14.6 1.7 14.8 1.9 14.8 2.3C14.8 2.7 14.5 2.9 14.2 2.9Z"
                fill="#575757"
              />
              <path
                d="M14.2 6.40001H7.3C7 5.70001 6.4 5.20001 5.5 5.20001C4.6 5.20001 4 5.70001 3.8 6.40001H0.6C0.2 6.40001 0 6.60001 0 7.00001C0 7.40001 0.2 7.60001 0.6 7.60001H3.8C4 8.30001 4.8 8.80001 5.5 8.80001C6.2 8.80001 7 8.30001 7.3 7.60001H14.2C14.6 7.60001 14.8 7.40001 14.8 7.00001C14.8 6.60001 14.5 6.40001 14.2 6.40001ZM5.5 7.60001C5.2 7.60001 4.9 7.40001 4.9 7.00001C4.9 6.60001 5.1 6.40001 5.5 6.40001C5.9 6.40001 6.1 6.60001 6.1 7.00001C6.1 7.40001 5.9 7.60001 5.5 7.60001Z"
                fill="#575757"
              />
              <path
                d="M14.2 11.1H12.2C12 10.4 11.3 9.89999 10.5 9.89999C9.6 9.89999 9 10.4 8.8 11.1H0.6C0.2 11.1 0 11.3 0 11.7C0 12.1 0.2 12.3 0.6 12.3H8.7C8.9 13 9.7 13.5 10.4 13.5C11.1 13.5 11.9 13 12.1 12.3H14.1C14.5 12.3 14.7 12.1 14.7 11.7C14.8 11.4 14.5 11.1 14.2 11.1ZM10.5 12.3C10.1 12.3 9.9 12.1 9.9 11.7C9.9 11.3 10.1 11.1 10.5 11.1C10.9 11.1 11.1 11.3 11.1 11.7C11.1 12.1 10.8 12.3 10.5 12.3Z"
                fill="#575757"
              />
            </svg>
          </button>
          {noName && (
            <div className={cl.noName}>
              <p className={cl.noNameP1}>
                No matches for{" "}
                <span className={cl.noNameSpan}>{`${selectedName}`}</span>
              </p>
              <p className={cl.noNameP2}>
                Please try again with a different spelling or keywords.
              </p>
            </div>
          )}
        </div>
        <div className={`${cl.body} ${isOpen ? cl.bodyOpen : ""}`}>
          <button className={cl.imgClose} onClick={handleImgCloseClick}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.386207 14.8252C0.165517 15.049 0.165517 15.3846 0.386207 15.6084C0.606897 15.8322 0.937931 15.8322 1.15862 15.6084L7.88966 8.8951L14.731 15.8322C14.9517 16.0559 15.2828 16.0559 15.5034 15.8322C15.7241 15.6084 15.7241 15.2727 15.5034 15.049L8.66207 8.11189L15.8345 0.951049C16.0552 0.727273 16.0552 0.391608 15.8345 0.167832C15.6138 -0.0559441 15.2828 -0.0559441 15.0621 0.167832L7.88966 7.32867L0.937931 0.27972C0.717241 0.0559441 0.386207 0.0559441 0.165517 0.27972C-0.0551724 0.503497 -0.0551724 0.839161 0.165517 1.06294L7.22759 8.11189L0.386207 14.8252Z"
                fill="#DEDEDE"
              />
            </svg>
          </button>
          {dataAuthors && (
            <AuthorOrLoc
              placeholder="Select the artist"
              title="Artist"
              options={dataAuthors}
              selected={selectedAuthor}
              onChange={setSelectedAuthor}
              searchTerm={searchAuthor}
              setSearchTerm={setSearchAuthor}
            />
          )}
          {dataLocations && (
            <AuthorOrLoc
              placeholder="Select the location"
              title="Location"
              options={dataLocations}
              selected={selectedLocation}
              onChange={setSelectedLocation}
              searchTerm={searchLocation}
              setSearchTerm={setSearchLocation}
            />
          )}
          <Range selected={selectedYears} onChange={setSelectedYears} />
          <div className={cl.footer}>
            <Buttons
              send={handleSend}
              clear={handleClear}
              hideButtons={hideClear}
            />
          </div>
        </div>
      </div>
      {isError && <p className={cl.err}>Something went wrong...</p>}
      {isLoading && <p className={cl.load}>Loading...</p>}
      {isErrorAut && <p className={cl.err}>Something went wrong...</p>}
      {isErrorLoc && <p className={cl.err}>Something went wrong...</p>}
      {isLoadingAut && <p className={cl.load}>Loading...</p>}
      {isLoadingLoc && <p className={cl.load}>Loading...</p>}
    </section>
  );
};

export default Search;
