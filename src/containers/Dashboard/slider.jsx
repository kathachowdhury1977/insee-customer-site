import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux'
export default function Slider() {
    const dashbordImagesSlider = useSelector((state) => state.getAllDashBoardImages.getAllDashBoardImages)
    console.log(dashbordImagesSlider, 'dashbordImagesSlider88')
  return (
    <div>
      <Carousel>
        {
            dashbordImagesSlider && dashbordImagesSlider.map((item, index)=> {
                return (
        <Carousel.Item interval={2500}>
          <img
            className="d-block w-100"
            src={item.fileUrl}
            alt={item.fileName}
          />
         
        </Carousel.Item>
                )
            })
        }
       
      </Carousel>
    </div>
  );
}