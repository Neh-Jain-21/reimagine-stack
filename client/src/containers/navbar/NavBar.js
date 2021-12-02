/** @format */

import { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// api
import axios from "axios";
//imgs
import { Logo } from "src/assets";
//css
import "src/containers/navbar/navbar.css";

const NavBar = (props) => {
    const path = props.location.pathname;
    const email = localStorage.getItem("token");

    const LoggedOutPath = () => {
        return (
            <>
                <NavLink tabIndex={-1} className="navlink-common navlink-mr" to="/signin">
                    <Button
                        sx={
                            path === "/signin"
                                ? {
                                      bgcolor: "#FF7F00",
                                      textTransform: "capitalize",
                                      color: "white",
                                      borderColor: "whitesmoke",
                                      ":hover": {
                                          borderColor: "white",
                                          bgcolor: "#FF7F00",
                                      },
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                                : {
                                      color: "white",
                                      borderColor: "white",
                                      textTransform: "capitalize",
                                      ":hover": {
                                          borderColor: "white",
                                      },
                                      mr: 2,
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                        }
                        variant={path === "/signin" ? "contained" : "outlined"}
                    >
                        Log In
                    </Button>
                </NavLink>
                <NavLink tabIndex={-1} className="navlink-common  navlink-mr" to="/register">
                    <Button
                        sx={
                            path === "/register"
                                ? {
                                      bgcolor: "#FF7F00",
                                      textTransform: "capitalize",
                                      color: "white",
                                      borderColor: "whitesmoke",
                                      ":hover": {
                                          borderColor: "white",
                                          bgcolor: "#FF7F00",
                                      },
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                                : {
                                      color: "white",
                                      borderColor: "white",
                                      textTransform: "capitalize",
                                      ":hover": {
                                          borderColor: "white",
                                      },
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                        }
                        variant={path === "/register" ? "contained" : "outlined"}
                    >
                        Register
                    </Button>
                </NavLink>
            </>
        );
    };

    const LoggedInPath = () => {
        const snackBar = useSnackbar();
        const [userName, setUserName] = useState("");
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                const result = await axios.get(`http://192.168.1.157:5000/user/username`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                if (result.data.status === 1) {
                    setUserName(result.data.data.first_name + " " + result.data.data.last_name);
                    setLoading(false);
                } else {
                    setLoading(false);
                    snackBar.enqueueSnackbar(result.data.message, { variant: "error" });
                }
            };
            fetchData();
            // eslint-disable-next-line
        }, []);

        return (
            <>
                {path !== "/createpost" ? (
                    <NavLink tabIndex={-1} className="navlink-common navlink-mr" to="/createpost">
                        <Button
                            sx={{
                                color: "white",
                                borderColor: "white",
                                textTransform: "capitalize",
                                ":hover": {
                                    borderColor: "white",
                                },
                                height: { xs: 25, md: 35 },
                            }}
                            variant="outlined"
                        >
                            Create Post
                        </Button>
                    </NavLink>
                ) : null}
                <NavLink tabIndex={-1} className="navlink-common navlink-mr" to="/profile">
                    <LoadingButton
                        loading={loading}
                        loadingIndicator={<CircularProgress sx={{ color: "white" }} size={16} />}
                        sx={{
                            color: "white",
                            textTransform: "capitalize",
                            height: { xs: 25, md: 35 },
                        }}
                        variant="text"
                        startIcon={<AccountCircleIcon />}
                    >
                        {userName}
                    </LoadingButton>
                </NavLink>
            </>
        );
    };

    return (
        <>
            <div className="publicnav-header">
                <img className="publicnav-logo" src={Logo} alt="" />
                <div className="publicnav-align-right">
                    {email !== null ? LoggedInPath() : LoggedOutPath()}
                </div>
            </div>
        </>
    );
};

export default withRouter(NavBar);
