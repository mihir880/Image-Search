import { useState } from "react";
import React from "react";
import classes from "./App.module.css";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import GetDataForm from "./Components/GetData/GetDataForm";

function App() {
  const [resImages, setResImages] = useState(null);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const noResultsHandler = (length) => {
    if (length === 0) {
      setNoResultsFound(true);
    } else {
      setNoResultsFound(false);
    }
  };

  const removeResImages = () => {
    setResImages(null);
    setNoResultsFound(false);
  };

  return (
    <>
      <GetDataForm
        setResImages={setResImages}
        noResultsHandler={noResultsHandler}
        removeResImages={removeResImages}
      />
      {resImages && <ImageGallery imageData={resImages} />}
      {noResultsFound && (
        <div className={classes.no_results_found}>No Results found</div>
      )}
    </>
  );
}

export default App;
