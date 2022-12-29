// import fetch from "cross-fetch";
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { debounce } from "lodash";
import "./searchStyle.scss"

export const AutoCompleteSearch = ({ OPTIONS_TO_OBJECT, forcePopupIcon, INITIAL_VALUE, resetCount, inputLabel, variant, autoSelectFn, name, callSmartApiFn, isSmartSearch }) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(INITIAL_VALUE);
    let NEW_OPTIONS_TO_OBJECT = Array.isArray(OPTIONS_TO_OBJECT) ? OPTIONS_TO_OBJECT :[];

    const onChangeHandle = debounce(async value => {
        if (isSmartSearch) {
            callSmartApiFn(value)
        }
    }, 500);

    useEffect(() => {
        // 👇️ don't run on initial render
        if (resetCount !== 0) {
            setInputValue("")
        }
    }, [resetCount]);

    for (let obj of NEW_OPTIONS_TO_OBJECT) {
        obj["name"] = name
    }

    return (
        <>
            <Autocomplete
                size="small"
                className="autoComplete"
                id="asynchronous-demo"
                inputValue={inputValue}
                value={""}
                forcePopupIcon={forcePopupIcon}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                autoComplete={false}
                disableClearable
                getOptionSelected={(option, value) => option.label === value.label}
                getOptionLabel={option => option.label}

                options={Array.isArray(OPTIONS_TO_OBJECT) ? OPTIONS_TO_OBJECT : []}

                onChange={(e, value) => {

                    autoSelectFn(value)
                    if (value && value.label) {
                        setInputValue(value.label)
                    } else {
                        setInputValue("")
                    }
                }
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        size="small"
                        label={inputLabel}
                        variant={variant ? variant : "standard"}
                        onChange={(ev) => {
                            if (ev.target.value !== "" || ev.target.value !== null) {
                                setInputValue(ev.target.value)
                                onChangeHandle(ev.target.value)
                            }
                        }
                        }
                        InputLabelProps={{
                            style: { paddingLeft: isSmartSearch ? '10px' : '0px', fontSize: "14px" },
                        }}
                        // onPaste={(e)=>e.preventDefault()}
                    />
                )}
                
            />
        </>
    )
}


AutoCompleteSearch.propTypes = {
    inputLabel: PropTypes.number,
    variant: PropTypes.object,
    autoSelectFn: PropTypes.func
};