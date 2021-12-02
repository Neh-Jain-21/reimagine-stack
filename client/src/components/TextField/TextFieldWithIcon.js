/** @format */

import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const TextFieldWithIcon = (props) => {
    const { placeholder, name, value, onChange, onBlur } = props;

    //state
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="input-with-icon">
                <TextField
                    type={showPassword ? "text" : "password"}
                    sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                            outline: "none",
                            border: "none",
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
                <IconButton
                    onClick={() => {
                        setShowPassword(!showPassword);
                    }}
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </div>
        </>
    );
};

export default TextFieldWithIcon;
