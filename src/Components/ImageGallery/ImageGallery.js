import React from "react";
import classes from "./ImageGallery.module.css";

const ImageGallery = (props) => {
  return (
    <>
      <ul className={classes.ul}>
        {props.imageData.map((image) => (
          <li key={image.id} className={classes.li}>
            <img
              src={image.previewURL}
              alt={image.user}
              className={classes.img}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImageGallery;
