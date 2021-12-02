/** @format */

import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const DatePicker = (props) => {
    const { name, value, onChange, onBlur } = props;

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    value={value}
                    onChange={onChange}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                        <TextField
                            sx={{
                                backgroundColor: "#F9F9F9",
                                ".MuiOutlinedInput-notchedOutline": {
                                    outline: "none",
                                    borderColor: "white",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#000000",
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "1px solid rgb(255, 97, 97)",
                                    },
                                },
                            }}
                            name={name}
                            onBlur={onBlur}
                            color="warning"
                            size="small"
                            {...params}
                        />
                    )}
                />
            </LocalizationProvider>
        </>
    );
};

export default DatePicker;
