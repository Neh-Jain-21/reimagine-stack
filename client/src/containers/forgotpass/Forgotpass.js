/** @format */

import { useState } from "react";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
// api
import axios from "axios";
//components
import InputText from "src/components/TextField/InputText";
import InputField from "src/components/TextField/InputField";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import CommonLeft from "src/components/common/CommonLeft";
import Footer from "src/components/footer/Footer";
//css
import "src/containers/forgotpass/forgotpass.css";

const Forgotpass = () => {
    document.body.style.backgroundColor = "white";
    const snackBar = useSnackbar();
    const history = useHistory();

    // states
    const [loading, setLoading] = useState(false);

    //formik
    const Formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid Email").required("Required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const result = await axios.post(`http://192.168.1.157:5000/auth/forgot-password`, {
                email: values.email,
            });

            if (result.data.status === 1) {
                snackBar.enqueueSnackbar(result.data.message, { variant: "success" });
                setLoading(false);
                history.push("/emailverification", { email: values.email });
            } else {
                setLoading(false);
                snackBar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        },
    });

    return (
        <>
            <Grid sx={{ minHeight: "100vh", pt: "calc(5vh + 6px)" }} container>
                <CommonLeft />
                <Grid
                    sx={{
                        px: {
                            xs: 3,
                            lg: 5,
                        },
                        pt: 5,
                        pb: 3,
                    }}
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    md={7}
                    xs={12}
                >
                    <form className="signin-form" onSubmit={Formik.handleSubmit}>
                        <Grid container direction="column" item lg={5} md={7} xs={12}>
                            <span className="signin-welcome">Forgot password?</span>
                            <span className="forgotpass-login">
                                Please enter your registered email address we'll send you reset
                                instruction
                            </span>
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
                            <span className="forgot-reset-text" onClick={Formik.resetForm}>
                                RESET
                            </span>
                            <ButtonOrange loading={loading} text="Send" />
                        </Grid>
                    </form>
                    <Grid container>
                        <Footer className="forgotpass-copyright" />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Forgotpass;
