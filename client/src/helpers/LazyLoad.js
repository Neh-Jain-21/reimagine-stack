import { useState, useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const LazyLoad = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);

        return () => {
            setOpen(false);
        };
    }, []);

    return (
        <div>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default LazyLoad;