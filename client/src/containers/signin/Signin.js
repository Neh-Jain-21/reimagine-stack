/** @format */

import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Checkbox, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
// api
import axios from "axios";
//imgs
import { SigninImg } from "src/assets";
//css
import "src/containers/signin/signin.css";
//componenets
import InputText from "src/components/TextField/InputText";
import InputField from "src/components/TextField/InputField";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import TextFieldWithIcon from "src/components/TextField/TextFieldWithIcon";
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import Footer from "src/components/footer/Footer";
import Carousel from "src/components/carousel";

const Signin = () => {
    document.body.style.backgroundColor = "white";
    const history = useHistory();
    const snackBar = useSnackbar();

    const [loading, setLoading] = useState(false);

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email Invalid").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: async (value) => {
            setLoading(true);
            const result = await axios.post(`http://192.168.1.157:5000/auth/login`, {
                email: value.email,
                password: value.password,
            });

            if (result.data.status === 1) {
                snackBar.enqueueSnackbar(result.data.message, { variant: "success" });
                localStorage.setItem("token", result.data.data.token);
                setLoading(false);
                history.push("/postlist");
            } else {
                setLoading(false);
                snackBar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        },
    });

    return (
        <>
            <Grid
                sx={{
                    minHeight: "100vh",
                    pt: "calc(5vh + 6px)",
                }}
                container
                direction="row"
            >
                <Grid
                    sx={{
                        bgcolor: "#2F80ED",
                        display: { xs: "none", md: "flex" },
                    }}
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                    md={8}
                >
                    <Carousel>
                        <div className="signin-img-container">
                            <img className="signin-img" src={SigninImg} alt="..." />
                        </div>
                        <div className="signin-img-container">
                            <img className="signin-img" src={SigninImg} alt="..." />
                        </div>
                        <div className="signin-img-container">
                            <img className="signin-img" src={SigninImg} alt="..." />
                        </div>
                    </Carousel>
                </Grid>
                <Grid
                    sx={{
                        px: {
                            xs: 3,
                            lg: 10,
                        },
                        pt: 5,
                        pb: 3,
                    }}
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    md={4}
                    xs={12}
                >
                    <form className="signin-form" onSubmit={Formik.handleSubmit}>
                        <Grid container direction="column">
                            <span className="signin-welcome">Welcome Back!</span>
                            <span className="signin-login">Login to your account</span>
                            <InputText text="Email" />
                            <InputField
                                placeholder="Email"
                                name="email"
                                value={Formik.values.email}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={Formik.touched.email}
                                errors={Formik.errors.email}
                            />
                            <InputText text="Password" />
                            <TextFieldWithIcon
                                placeholder="Enter Your Password"
                                name="password"
                                value={Formik.values.password}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={Formik.touched.password}
                                errors={Formik.errors.password}
                            />
                            <Grid
                                sx={{ mt: 2 }}
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid justifyContent="center">
                                    <Checkbox
                                        sx={{ ml: -1.3 }}
                                        name="remember"
                                        color="warning"
                                        checked={Formik.values.remember}
                                        value={Formik.values.remember}
                                        size="small"
                                        onChange={Formik.handleChange}
                                    />
                                    <span className="signin-forgot">Remember Me</span>
                                </Grid>
                                <Grid justifyContent="center">
                                    <NavLink className="navlink-common" to="/forgotpass">
                                        <span className="signin-forgot">Forgot Password?</span>
                                    </NavLink>
                                </Grid>
                            </Grid>
                            <ButtonOrange loading={loading} text="Sign In" />
                        </Grid>
                    </form>
                    <Footer className="signin-copyright" />
                </Grid>
            </Grid>
        </>
    );
};

export default Signin;
