import React, { useState, useEffect } from "react";
import "./ListingDetail.scss";

const allImages = [
  {
    id: 1,
    imgUrl: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    imgUrl: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    imgUrl: "https://via.placeholder.com/150"
  }
];

const DeleteImg = () => {
  const [pics, setPics] = useState([]);

  const removeImage = (id) => {
    setPics((oldState) => oldState.filter((item) => item.id !== id));
  };

  useEffect(() => {
    //fake fetch data
    setPics(allImages);
  }, []);
  return (
    <div className="row">
      {pics.map((pic) => {
        return (
          <div className="col-3">
            <div className="upload_imgs">
            <img
              src={pic.imgUrl}
              className="image"
            />
            <button className="delete" onClick={() => removeImage(pic.id)}>X</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeleteImg;
