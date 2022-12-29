import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { debounce } from "lodash";

export const AutoSearch = ({
  API_URL,
  resetCount,
  setSelectedValue,
  inputLabel,
  variant,
  autoSelectFn,
  value,
  options: [],
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(options);
  const [inputValue, setInputValue] = React.useState(value);

  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (resetCount !== 0) {
      setInputValue("");
    }
  }, [resetCount]);

  useEffect(() => {
    setSelectedValue(inputValue);
  }, [inputValue, setSelectedValue]);

  return (
    <>
      <Autocomplete
        style={{ width: "250px" }}
        id="asynchronous-demo"
        inputValue={inputValue}
        forcePopupIcon={false}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.label === value.label}
        getOptionLabel={(option) => option.label}
        options={options}
        loading={loading}
        onChange={(e, value) => {
          autoSelectFn(value);
          if (value && value.label) {
            setInputValue(value.label);
          } else {
            setInputValue("");
          }

          setSelectedValue(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={inputLabel}
            size="small"
            onChange={(ev) => {
              if (ev.target.value !== "" || ev.target.value !== null) {
                setInputValue(ev.target.value);
                //onChangeHandle(ev.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            InputLabelProps={{
              style: { paddingLeft: "10px", fontSize: "14px" },
            }}
          />
        )}
      />
    </>
  );
};

AutoSearch.propTypes = {
  API_URL: PropTypes.string,
  inputLabel: PropTypes.number,
  variant: PropTypes.object,
  autoSelectFn: PropTypes.func,
  options: PropTypes.array,
};
