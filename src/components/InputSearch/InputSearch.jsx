import React from 'react';
import SearchField from "react-search-field";
import "./InputSearch.scss";
import { useDispatch, useSelector } from 'react-redux'

const InputSearch = (props) => {
    const onSearchClick=(e)=>{
        props.inputSearch(e);
    }

    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  
    return (
        <>
         <div className="input_search">
         <SearchField          
            placeholder={props.placeholder}            
            onChange={props.onChangeSearch}
            // searchText="This is initial search text"
            classNames="test-class"
            style={{fontSize: `${FontChange}px`}}
            />
         </div>
        </>
    )

}

export default InputSearch;