import React, { useState } from "react";

function ToggleSwitch(props) {
  const [checked, setChecked] = useState(props.defaultChecked);
  const [Text] = useState(props.Text);
  function onChange(e) {
    setChecked(document.getElementById(props.id).checked);
    if (props.onToggleChange) props.onToggleChange(checked);
  }
  console.log(checked, "checked");
  return (
    <div className={"switchToggle"}>
      <input
        type="checkbox"
        name={props.Name}
        className="toggle-switch-checkbox"
        id={props.id}
        defaultChecked={false}
        onChange={onChange}
      />
      {props.id ? (
        <label className="toggle-switch-label" htmlFor={props.id}>
          <span
            className={
              props.disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={Text[0]}
            data-no={Text[1]}
          />
          <span
            className={
              props.disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
            }
          />
        </label>
      ) : null}
    </div>
  );
}
export default ToggleSwitch;
