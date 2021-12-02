/** @format */

import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Checkbox, FormControlLabel, Grid, Input, Radio, RadioGroup } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
// api
import axios from "axios";
//imgs
import { RegisterImg, UserImg } from "src/assets";
//css
import "src/containers/register/register.css";
//components
import InputText from "src/components/TextField/InputText";
import InputField from "src/components/TextField/InputField";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import TextFieldWithIcon from "src/components/TextField/TextFieldWithIcon";
import Footer from "src/components/footer/Footer";
import DatePicker from "src/components/datepicker/DatePicker";

const Register = () => {
    document.body.style.backgroundColor = "white";
    const history = useHistory();
    const snackBar = useSnackbar();

    //states
    const [img, setImg] = useState(UserImg);
    const [date, setDate] = useState(new Date().toDateString());
    const [loading, setLoading] = useState(false);

    const Formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            password: "",
            cpassword: "",
            dob: date,
            gender: "male",
            terms: false,
        },
        validationSchema: Yup.object({
            image: Yup.string().required("Required"),
            fname: Yup.string()
                .required("Required")
                .min(3, "Min 3 Char")
                .max(15, "Max 3 Char")
                .trim(),
            lname: Yup.string()
                .required("Required")
                .min(3, "Min 3 Char")
                .max(15, "Max 3 Char")
                .trim(),
            email: Yup.string().required("Required").email("Invalid Email").trim(),
            phone: Yup.string()
                .required("Required")
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(10, "Must be exactly 10 digits")
                .max(10, "Must be exactly 10 digits"),
            password: Yup.string().required("Required").min(8, "Min 8 Char").trim(),
            cpassword: Yup.string()
                .required("Required")
                .min(8, "Min 8 Char")
                .equals([Yup.ref("password"), null], "Password Mismatch")
                .trim(),
            dob: Yup.string().notOneOf(["Invalid Date", null], "Invalid Date").required("Required"),
            terms: Yup.boolean().isTrue("Please accept Terms of Service"),
        }),
        onSubmit: async (value) => {
            setLoading(true);
            const formData = new FormData();

            formData.append("fname", value.fname);
            formData.append("lname", value.lname);
            formData.append("email", value.email);
            formData.append("password", value.password);
            formData.append("phone", value.phone);
            formData.append("dob", value.dob);
            formData.append("gender", value.gender);
            formData.append("image", value.image);

            const result = await axios.post(`http://192.168.1.157:5000/auth/register`, formData);

            if (result.data.status === 1) {
                snackBar.enqueueSnackbar(result.data.message, { variant: "success" });
                setLoading(false);
                history.push("/signin");
            } else {
                setLoading(false);
                snackBar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        },
    });

    const handleImgInput = (event) => {
        //preview image
        if (event.target.files[0] !== undefined) {
            let url = URL.createObjectURL(event.target.files[0]);
            setImg(url);
            Formik.setFieldValue("image", event.target.files[0]);
        }
    };

    return (
        <>
            <Grid sx={{ minHeight: "100vh", pt: "calc(5vh + 6px)" }} container>
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
                    <div className="register-text-container">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry.
                        </p>
                    </div>
                    <div className="register-img-container">
                        <img className="signin-img" src={RegisterImg} alt="..." />
                    </div>
                </Grid>
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
                        <Grid container direction="column">
                            <span className="signin-welcome">Create your account</span>
                            <span className="signin-login">
                                We need some details to setup your account
                            </span>

                            {/* Image */}
                            <Grid sx={{ mt: 3 }} container alignItems="center">
                                <img src={img} className="userimg" alt="..." />
                                <label htmlFor="userimg-input">
                                    <Input
                                        sx={{ display: "none" }}
                                        accept="image/*"
                                        id="userimg-input"
                                        onChange={handleImgInput}
                                        onBlur={Formik.handleBlur}
                                        type="file"
                                    />
                                    <Button
                                        sx={{
                                            ml: 3,
                                            color: "black",
                                            bgcolor: "white",
                                            border: "2px solid #333333",
                                            "&:hover": {
                                                bgcolor: "white",
                                            },
                                        }}
                                        size="small"
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                            </Grid>
                            <p className="signin-error">{Formik.errors.image}</p>

                            {/* name */}
                            <Grid container alignItems="center">
                                <Grid sx={{ mt: 2 }} item xs={12} md={5}>
                                    <InputText text="First Name*" />
                                    <InputField
                                        placeholder="Enter Your First Name"
                                        name="fname"
                                        value={Formik.values.fname}
                                        onChange={Formik.handleChange}
                                        onBlur={Formik.handleBlur}
                                    />
                                    <ErrorMessage
                                        touched={Formik.touched.fname}
                                        errors={Formik.errors.fname}
                                    />
                                </Grid>
                                <Grid sx={{ ml: { xs: 0, md: 5 }, mt: 2 }} item xs={12} md={5}>
                                    <InputText text="Last Name*" />
                                    <InputField
                                        placeholder="Enter Your Last Name"
                                        name="lname"
                                        value={Formik.values.lname}
                                        onChange={Formik.handleChange}
                                        onBlur={Formik.handleBlur}
                                    />
                                    <ErrorMessage
                                        touched={Formik.touched.lname}
                                        errors={Formik.errors.lname}
                                    />
                                </Grid>
                            </Grid>

                            {/* Email Phone */}
                            <Grid container alignItems="center">
                                <Grid sx={{ mt: 2 }} item xs={12} md={5}>
                                    <InputText text="Email*" />
                                    <InputField
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={Formik.values.email}
                                        onChange={Formik.handleChange}
                                        onBlur={Formik.handleBlur}
                                    />
                                    <ErrorMessage
                                        touched={Formik.touched.email}
                                        errors={Formik.errors.email}
                                    />
                                </Grid>
                                <Grid sx={{ ml: { xs: 0, md: 5 }, mt: 2 }} item xs={12} md={5}>
                                    <InputText text="Phone*" />
                                    <InputField
                                        placeholder="Enter Your Phone Number"
                                        name="phone"
                                        value={Formik.values.phone}
                                        onChange={Formik.handleChange}
                                        onBlur={Formik.handleBlur}
                                    />
                                    <ErrorMessage
                                        touched={Formik.touched.phone}
                                        errors={Formik.errors.phone}
                                    />
                                </Grid>
                            </Grid>

                            {/* Password */}
                            <Grid container alignItems="center">
                                <Grid sx={{ mt: 2 }} item xs={12} md={5}>
                                    <InputText text="Password*" />
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
                                </Grid>
                                <Grid sx={{ ml: { xs: 0, md: 5 }, mt: 2 }} item xs={12} md={5}>
                                    <InputText text="Confirm Password*" />
                                    <TextFieldWithIcon
                                        placeholder="Enter Your Confirm Password"
                                        name="cpassword"
                                        value={Formik.values.cpassword}
                                        onChange={Formik.handleChange}
                                        onBlur={Formik.handleBlur}
                                    />
                                    <ErrorMessage
                                        touched={Formik.touched.cpassword}
                                        errors={Formik.errors.cpassword}
                                    />
                                </Grid>
                            </Grid>

                            {/* DOB Gender */}
                            <Grid container alignItems="center">
                                <Grid item xs={12} md={5} container direction="column">
                                    <InputText text="Date of Birth*" />
                                    <DatePicker
                                        value={date}
                                        onChange={(val) => {
                                            setDate(val);
                                            Formik.setFieldValue("dob", val);
                                        }}
                                        name="dob"
                                        onBlur={Formik.handleBlur}
                                    />
                                    <ErrorMessage
                                        touched={Formik.touched.dob}
                                        errors={Formik.errors.dob}
                                    />
                                </Grid>
                                <Grid sx={{ ml: { xs: 1, md: 6 }, mt: 4 }} item xs={12} md={5}>
                                    <InputText text="Gender*" />
                                    <RadioGroup
                                        row
                                        value={Formik.values.gender}
                                        aria-label="gender"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            name="gender"
                                            value="male"
                                            onChange={Formik.handleChange}
                                            control={<Radio />}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            name="gender"
                                            value="female"
                                            onChange={Formik.handleChange}
                                            control={<Radio />}
                                            label="Female"
                                        />
                                    </RadioGroup>
                                    <ErrorMessage
                                        touched={Formik.touched.gender}
                                        errors={Formik.errors.gender}
                                    />
                                </Grid>
                            </Grid>

                            {/* Terms */}
                            <Grid sx={{ mt: 2 }} justifyContent="center">
                                <Checkbox
                                    sx={{ ml: -1.4, borderRadius: "50%" }}
                                    name="terms"
                                    color="warning"
                                    checked={Formik.values.terms}
                                    value={Formik.values.terms}
                                    size="small"
                                    onChange={Formik.handleChange}
                                    onBlur={Formik.handleBlur}
                                />
                                <span className="register-terms">
                                    I agree to the terms of services
                                </span>
                            </Grid>
                            <ErrorMessage
                                touched={Formik.touched.terms}
                                errors={Formik.errors.terms}
                            />

                            {/* Register */}
                            <Grid container alignItems="center">
                                <Grid item xs={12} md={5}>
                                    <ButtonOrange loading={loading} text="Get Started" />
                                </Grid>
                                <Grid sx={{ pl: { xs: 0, md: 5 } }} item xs={12} md={6}>
                                    <Footer className="register-copyright" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default Register;
