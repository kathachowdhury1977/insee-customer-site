import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
function PlantName(props) {
    ///const plantNameData = useSelector((state) => state.plantNameForShipment);
    const[plantName,setplantName]=useState('');
    useEffect(()=>{
        
        let findPlantName=[
        {'plantId':1000,'plantName':'Head office'},
        {'plantId':1010,'plantName':'Suratthani'},
        {'plantId':1011,'plantName':'Suratthani'},
        {'plantId':1012,'plantName':'Khonkaen'}
        ,{'plantId':1041,'plantName':'Saraburi'},
        {'plantId':1042,'plantName':'Saraburi'}
        ,{'plantId':1043,'plantName':'Saraburi'}
        ,{'plantId':1044,'plantName':'Saraburi'}
        ,{'plantId':1013,'plantName':'Udon Thaniani'}
        ,{'plantId':2441,'plantName':'Cat Lai'}
        ,{'plantId':2443,'plantName':'Hiep Phuoc'}
        ,{'plantId':2450,'plantName':'Nhon Trach'}
        ,{'plantId':2442,'plantName':'Thi Vai'}
        ,{'plantId':2440,'plantName':'Hon Chong'}
        ,{'plantId':2416,'plantName':'Dong Nai warehouse'}
        ,{'plantId':2424,'plantName':'HN-Tan cang- Mobile'}
        ,{'plantId':2417,'plantName':'Binh Duong warehouse'}
        ,{'plantId':2410,'plantName':'Can Tho Warehouse'}
        ,{'plantId':2421,'plantName':'Cat Lai-conwood'}
        ,{'plantId':2426,'plantName':'DRYMIX WAREHOUSE'}
      ];
        ///setplantName(findPlantName!==undefined?findPlantName.plantName:'');
        findPlantName=findPlantName.find((plant)=>plant.plantName==props.plantCode);
        ///console.log('findPlantName',findPlantName!==);
        setplantName(findPlantName!==undefined?findPlantName.plantName:'');
    },[])

    console.log(props.plantCode, 'props.plantCode')
    return (
        <>
          <span style={{color:"red"}}>
            {plantName === "Saraburi" ? "สระบุรี - Saraburi" : ""}
            {plantName === "Head Office" ? "สำนักงานใหญ่ - Head Office" : ""}
            {plantName === "Suratthani" ? "สุราษฎร์ธานี - Suratthani" : ""}
            {plantName === "Khon Kean" ? "ขอนแก่น - Khon Kean" : ""}
            {plantName === "Udon Thaniani" ? "อุดรธานี - Udon Thaniani" : ""}


            {plantName === "Cat Lai" ? "Cat Lai" : ""}
            {plantName === "Hiep Phuoc" ? "Hiep Phuoc" : ""}
            {plantName === "Nhon Trach" ? "Nhon Trach" : ""}
            {plantName === "Thi Vai" ? "Thi Vai" : ""}
            {plantName === "Hon Chong" ? "Hon Chong" : ""}

            {plantName === "Dong Nai warehouse" ? "Dong Nai warehouse" : ""}
            {plantName === "HN-Tan cang- Mobile" ? "HN-Tan cang- Mobile" : ""}
            {plantName === "Binh Duong warehouse" ? "Binh Duong warehouse" : ""}
            {plantName === "Can Tho Warehouse" ? "Can Tho Warehouse" : ""}
            {plantName === "Cat Lai-conwood" ? "Cat Lai-conwood" : ""}
            {plantName === "DRYMIX WAREHOUSE" ? "DRYMIX WAREHOUSE" : ""}

              
              {/* {plantName} */}
              </span>
        </>
    )
}
export default PlantName;