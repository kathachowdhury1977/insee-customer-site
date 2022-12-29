import React, { useState } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";

function FormInput(props) {
  const [FaIcon] = useState(props.faIcon);
  const [showResults, setShowResults] = React.useState(false);
  const FontChange = useSelector(
    (state) => state.fontsizechanger.fontsizechanger
  );

  const onClickSowDropdown = () =>
    setShowResults((showResults) => !showResults);
  // console.log(window.location.pathname, "#f64028#f64028")
  function openModal(event) {
    if (props.openModal) props.openModal(true);
  }
  //console.log(props.show_dropdown)
  return (
    <>
      {props.show_dropdown ? (
        <li>
          <Link onClick={openModal}>
            <i className={FaIcon}></i>{" "}
            <span style={{ fontSize: `${FontChange}px` }}>{props.label}</span>
            <span className="pull-right-container">
              <i className={props.classdropdown}></i>
            </span>
          </Link>
          {props.show_dropdown
            ? props.show_dropdown.map((element, index) => (
                <ul style={{ marginLeft: "20px" }}>
                  <li
                    className={
                      window.location.pathname === props.src
                        ? "active treeview menu-open"
                        : null
                    }
                  >
                    <Link to={element.label_src} onClick={openModal}>
                      <span style={{ fontSize: `${FontChange}px` }}>
                        {element.label_name}
                      </span>
                      <span className="pull-right-container">
                        <i className={props.classdropdown}></i>
                      </span>
                    </Link>
                  </li>
                </ul>
              ))
            : null}
        </li>
      ) : (
        <li
          className={
            window.location.pathname === props.src
              ? "active treeview menu-open"
              : null
          }
        >
          <Link to={props.src} onClick={openModal}>
            <i className={FaIcon}></i>{" "}
            <span style={{ fontSize: `${FontChange}px` }}>{props.label}</span>
            <span className="pull-right-container">
              <i className={props.classdropdown}></i>
            </span>
          </Link>
        </li>
      )}
      {/* <li className={window.location.pathname === props.src ? "active treeview menu-open" : null}>
        <Link to={props.src} onClick ={openModal}>
          <i className={FaIcon}></i> <span>{props.label}</span>
          <span className="pull-right-container">
            <i className={props.classdropdown}></i>
          </span>
        </Link>
        
      </li> */}
    </>
  );
}
export default FormInput;
