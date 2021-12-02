/** @format */

import { useState } from "react";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
// api
import axios from "axios";
//css
import "src/containers/changepass/changepass.css";
//components
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import InputText from "src/components/TextField/InputText";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import TextFieldWithIcon from "src/components/TextField/TextFieldWithIcon";
import Footer from "src/components/footer/Footer";

const ChangePass = () => {
    document.body.style.backgroundColor = "white";
    const history = useHistory();
    const snackbar = useSnackbar();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            oldpass: "",
            newpass: "",
            cpass: "",
        },
        validationSchema: Yup.object({
            oldpass: Yup.string().min(8, "Min 8 char").required("Required").trim(),
            newpass: Yup.string().min(8, "Min 8 char").required("Required").trim(),
            cpass: Yup.string()
                .required("Required")
                .min(8, "Min 8 Char")
                .equals([Yup.ref("newpass"), null], "Password Mismatch")
                .trim(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const result = await axios.post(
                `http://192.168.1.157:5000/user/change-password`,
                {
                    newpassword: values.newpass,
                    oldpassword: values.oldpass,
                },
                {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                }
            );

            if (result.data.status === 1) {
                snackbar.enqueueSnackbar(result.data.message, { variant: "success" });
                setLoading(false);
                history.push("/postlist");
            } else {
                setLoading(false);
                snackbar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        },
    });

    return (
        <>
            <Grid sx={{ p: 3, minHeight: "100vh", pt: "10vh" }} container justifyContent="center">
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    item
                    xs={12}
                    md={5}
                >
                    <div>
                        <p className="changepass-heading-text">Change Password</p>
                        <p className="changepass-text">Please enter your new password</p>

                        <form onSubmit={formik.handleSubmit}>
                            <InputText text="Old password" />
                            <TextFieldWithIcon
                                placeholder="Old Password"
                                name="oldpass"
                                value={formik.values.oldpass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={formik.touched.oldpass}
                                errors={formik.errors.oldpass}
                            />

                            <div className="changepass-mt"></div>
                            <InputText text="New password" />
                            <TextFieldWithIcon
                                placeholder="New Password"
                                name="newpass"
                                value={formik.values.newpass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={formik.touched.newpass}
                                errors={formik.errors.newpass}
                            />

                            <div className="changepass-mt"></div>
                            <InputText text="Confirm password" />
                            <TextFieldWithIcon
                                placeholder="Confirm Password"
                                name="cpass"
                                value={formik.values.cpass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={formik.touched.cpass}
                                errors={formik.errors.cpass}
                            />

                            <ButtonOrange loading={loading} text="Save" />
                        </form>
                    </div>
                    <Footer className="changepass-footer-text" />
                </Grid>
            </Grid>
        </>
    );
};

export default ChangePass;
