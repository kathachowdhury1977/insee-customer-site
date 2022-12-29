import React, { useState, useEffect } from "react";
import Item from "../../assets/img/inseeLogo.png";
function IsImgChecked(props) {
    const[imageUrlStatus,setImageUrlStatus]=useState('');
    const checkImage = path =>
    new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({path, status: 'ok'});
        img.onerror = () => resolve({path, status: 'error'});
        img.src = path;
   });
    useEffect(()=>{
        checkImage(props.imageUrl).then((responce)=>setImageUrlStatus(responce.status));
    },[])
    return (
        <>
          <img className="image-1" src={imageUrlStatus!=='error'?props.imageUrl:Item} />
        </>
    )
}
export default IsImgChecked;