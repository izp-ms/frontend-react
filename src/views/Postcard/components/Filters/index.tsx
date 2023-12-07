import { Button, Input } from "@mui/material";
import { SetStateAction, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CountrySelect from "../../../../components/TextFieldCountry";
import styles from "./styles.module.scss";

interface Props {
  viewType: "postcard" | "postcardData";
}

export const Filters = (props: Props) => {
  const { viewType } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [countryValue, setCountryValue] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const [searchCityInput, setSearchCityInput] = useState("");

  const handleSetCountry = (country: string) => {
    searchParams.set("country", country);
    setCountryValue(country);
  };

  const handleChangeSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchInput(event.target.value);
  };

  const handleChangeSearchCity = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchCityInput(event.target.value);
  };

  const handleClickSearch = () => {
    if (viewType === "postcard") {
      if (searchInput === "") {
        searchParams.delete("Search");
      } else {
        console.log("alert 1");
        searchParams.set("Search", searchInput);
      }
    } else {
      if (searchInput === "") {
        searchParams.delete("Search");
      } else {
        console.log("alert 2");
        searchParams.set("Search", searchInput);
      }
      if (searchCityInput === "") {
        searchParams.delete("City");
      } else {
        console.log("alert 3");
        searchParams.set("City", searchCityInput);
      }
    }
    setSearchParams(searchParams);
  };

  const handleClickClear = () => {
    searchParams.delete("Search");
    searchParams.delete("City");
    searchParams.delete("country");
    setSearchInput("");
    setSearchCityInput("");
    setSearchParams(searchParams);
  };

  if (viewType == "postcard") {
    return (
      <>
        Search:
        <Input
          placeholder="Enter phrase"
          onChange={handleChangeSearch}
          value={searchInput}
        />
        <span
          className={styles.update}
          onClick={() => {
            handleClickSearch();
          }}
        >
          <Button variant="contained" className={styles.btn}>
            Search
          </Button>
        </span>
        <span
          className={styles.update}
          onClick={() => {
            handleClickClear();
          }}
        >
          <Button variant="contained" className={styles.btn}>
            Clear
          </Button>
        </span>
      </>
    );
  }
  if (viewType == "postcardData") {
    return (
      <>
        Search:
        <Input
          placeholder="Enter phrase"
          onChange={handleChangeSearch}
          value={searchInput}
        />
        City:
        <Input
          placeholder="Enter name of the city"
          onChange={handleChangeSearchCity}
          value={searchCityInput}
        />
        <div className={styles.country}>
          <CountrySelect
            country={countryValue}
            handleSetCountry={handleSetCountry}
          />
        </div>
        <span
          className={styles.update}
          onClick={() => {
            handleClickSearch();
          }}
        >
          <Button variant="contained" className={styles.btn}>
            Search
          </Button>
        </span>
        <span
          className={styles.update}
          onClick={() => {
            handleClickClear();
          }}
        >
          <Button variant="contained" className={styles.btn}>
            Clear
          </Button>
        </span>
      </>
    );
  }

  return null;
};
