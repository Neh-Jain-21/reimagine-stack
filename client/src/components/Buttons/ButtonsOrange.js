/** @format */

import { LoadingButton } from "@mui/lab";

const ButtonOrange = (props) => {
    const { onClick, text, loading } = props;

    return (
        <>
            <LoadingButton
                loading={loading}
                type="submit"
                sx={{
                    my: 3,
                    color: "white",
                    bgcolor: "#FF7F00",
                    textTransform: "capitalize",
                    "&:hover": {
                        bgcolor: "#FF7F00",
                    },
                }}
                size="large"
                onClick={onClick}
                fullWidth
            >
                {text}
            </LoadingButton>
        </>
    );
};

export default ButtonOrange;
