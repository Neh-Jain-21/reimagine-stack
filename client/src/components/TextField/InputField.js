/** @format */

import { TextField } from "@mui/material";

const InputField = (props) => {
    const { placeholder, name, value, onChange, onBlur } = props;

    return (
        <>
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
                size="small"
                fullWidth
                placeholder={placeholder}
                variant="outlined"
                color="warning"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </>
    );
};

export default InputField;
