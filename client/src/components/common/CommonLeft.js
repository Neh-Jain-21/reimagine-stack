/** @format */

import { Grid } from "@mui/material";
//imgs
import { ForgotPass } from "src/assets";
//css
import "src/components/common/commonleft.css";

const CommonLeft = () => {
    return (
        <>
            <Grid
                sx={{
                    bgcolor: "#2F80ED",
                    display: { xs: "none", md: "flex" },
                }}
                item
                container
                direction="column"
                alignItems="center"
                md={5}
            >
                <div className="commonleft-text-container">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="commonleft-img-container">
                    <img className="signin-img" src={ForgotPass} alt="..." />
                </div>
            </Grid>
        </>
    );
};

export default CommonLeft;
