import React, { useRef, useState } from "react";
import classes from "./GetDataForm.module.css";
import axios from "axios";

const baseURL = "https://pixabay.com/api/";
const reqKey = "29025154-d7fef03f9584fc2b7d5b1fda9";

const GetDataForm = (props) => {
  const searchQuery = useRef();
  const [searchQueryValid, setSearchQueryValid] = useState();

  const searchQueryHandler = (event) => {
    if (event.target.value) {
      setSearchQueryValid(true);
    } else {
      setSearchQueryValid(false);
    }
  };

  const searchInitiate = (event) => {
    event.preventDefault();
    if (searchQueryValid) {
      axios
        .get(baseURL, {
          params: {
            key: reqKey,
            q: searchQuery.current.value,
            image_type: "photo",
            per_page: "50",
          },
        })
        .then((res) => {
          console.log(res.data.hits.length);
          props.setResImages(res.data.hits);
          props.noResultsHandler(res.data.hits.length);
        })
        .catch((error) => {
          console.log("Some Error has occured. Please try again");
        });
    }
  };

  const clearSearchHandler = () => {
    searchQuery.current.value = "";
    setSearchQueryValid(null);
    props.removeResImages(null);
  };

  return (
    <>
      <div className={classes["new-search"]}>
        <form onSubmit={searchInitiate}>
          <div className={classes["new-search__controls"]}>
            <div className={classes["new-search__control"]}>
              <input
                type="text"
                id="query_data"
                placeholder="Enter your search term"
                onChange={searchQueryHandler}
                ref={searchQuery}
                required
              ></input>
            </div>
            {searchQueryValid === false && (
              <p className={classes.empty_input}>
                Enter something term to search
              </p>
            )}
            <div className={classes["new-search__actions"]}>
              <button type="submit">Search</button>
              <button type="cancel" onClick={clearSearchHandler}>
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default GetDataForm;
