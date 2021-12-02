/** @format */

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { NavLink, useHistory } from "react-router-dom";
import {
    Button,
    Grid,
    TextField,
    Input,
    RadioGroup,
    Radio,
    FormControlLabel,
    CircularProgress,
} from "@mui/material";
import {
    AccountCircle,
    EmailOutlined,
    PhoneOutlined,
    FemaleOutlined,
    MaleOutlined,
    CakeOutlined,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
// api
import axios from "axios";
//css
import "src/containers/profile/profile.css";
//components
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
//imgs
import { UserImg } from "src/assets";
import InputText from "src/components/TextField/InputText";
import InputField from "src/components/TextField/InputField";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import DatePicker from "src/components/datepicker/DatePicker";

const Profile = () => {
    document.body.style.backgroundColor = "#E5E5E5";
    const history = useHistory();
    const snackbar = useSnackbar();

    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [date, setDate] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const convert = (str) => {
        var date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [month, day, date.getFullYear()].join("/");
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await axios.get(`http://192.168.1.157:5000/user/user`, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (result.data.status === 1) {
                setUser(result.data.data);
                setDate(convert(result.data.data.dob).toString());
                setImg(result.data.data.image);
                setLoading(false);
            } else {
                setLoading(false);
                snackbar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    const Formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fname: user.first_name ? user.first_name : "",
            lname: user.last_name ? user.last_name : "",
            email: user.email ? user.email : "",
            phone: user.phone ? user.phone : "",
            dob: date ? date : "",
            gender: user.gender ? user.gender : "",
        },
        validationSchema: Yup.object({
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
            dob: Yup.string().notOneOf(["Invalid Date", null], "Invalid Date").required("Required"),
        }),
        onSubmit: async (value) => {
            setButtonLoading(true);
            const formData = new FormData();

            formData.append("image", imgFile);
            formData.append("first_name", value.fname);
            formData.append("last_name", value.lname);
            formData.append("phone", value.phone);
            formData.append("dob", value.dob);
            formData.append("gender", value.gender);

            const result = await axios.post(`http://192.168.1.157:5000/user/user`, formData, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (result.data.status === 1) {
                setButtonLoading(false);
                snackbar.enqueueSnackbar(result.data.message, { variant: "success" });
            } else {
                setButtonLoading(false);
                snackbar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        },
    });

    const handleImgInput = (event) => {
        //preview image
        if (event.target.files[0] !== undefined) {
            let url = URL.createObjectURL(event.target.files[0]);
            setImg(url);
            setImgFile(event.target.files[0]);
            Formik.setFieldValue("image", url);
        }
    };

    return (
        <>
            <Grid sx={{ pt: "calc(5vh + 20px)" }} container>
                {/* Profile Icon and Text */}
                <Grid
                    sx={{
                        p: 2,
                        borderBottom: "1px solid rgb(44,44,44,0.2)",
                    }}
                    container
                    direction="row"
                    alignItems="center"
                >
                    <AccountCircle sx={{ mr: 1 }} fontSize="large" color="warning" />
                    <p className="posts-heading">Profile</p>
                </Grid>

                {loading ? (
                    <Grid height="80vh" container justifyContent="center" alignItems="center">
                        <CircularProgress disableShrink />
                    </Grid>
                ) : (
                    <Grid container>
                        {/* Left Cont */}
                        <Grid
                            container
                            item
                            sx={{ p: 3 }}
                            xs={12}
                            md={4}
                            direction="column"
                            alignItems="center"
                        >
                            <Grid
                                container
                                item
                                sx={{
                                    py: 3,
                                    backgroundColor: "white",
                                    minHeight: "75vh",
                                }}
                                xs={12}
                                md={4}
                                direction="column"
                                alignItems="center"
                                flexWrap="nowrap"
                            >
                                <img
                                    src={img ? img : UserImg}
                                    alt="..."
                                    className="profile-big-img"
                                />
                                <p className="profile-left-name">
                                    {user.first_name + " " + user.last_name}
                                </p>
                                <div>
                                    <Grid sx={{ mt: 5 }} container alignItems="center">
                                        <EmailOutlined sx={{ color: "#5E6367", mr: 1 }} />
                                        <p className="profile-left-desc">{user.email}</p>
                                    </Grid>
                                    <Grid sx={{ mt: 1 }} container alignItems="center">
                                        <PhoneOutlined sx={{ color: "#5E6367", mr: 1 }} />
                                        <p className="profile-left-desc">{user.phone}</p>
                                    </Grid>
                                    <Grid sx={{ mt: 1 }} container alignItems="center">
                                        {user.gender === "male" ? (
                                            <>
                                                <MaleOutlined sx={{ color: "#5E6367", mr: 1 }} />
                                                <p className="profile-left-desc">Male</p>
                                            </>
                                        ) : (
                                            <>
                                                <FemaleOutlined sx={{ color: "#5E6367", mr: 1 }} />
                                                <p className="profile-left-desc">Female</p>
                                            </>
                                        )}
                                    </Grid>
                                    <Grid sx={{ mt: 1 }} container alignItems="center">
                                        <CakeOutlined sx={{ color: "#5E6367", mr: 1 }} />
                                        <p className="profile-left-desc">
                                            {convert(user.dob).toString()}
                                        </p>
                                    </Grid>
                                </div>
                                <NavLink className="navlink-common" to="/changepass">
                                    <Button
                                        sx={{
                                            mt: 5,
                                            textTransform: "capitalize",
                                            width: 153,
                                            color: "black",
                                            borderColor: "black",
                                        }}
                                        variant="outlined"
                                        color="inherit"
                                    >
                                        Change Password
                                    </Button>
                                </NavLink>
                                <NavLink className="navlink-common" to="/signin">
                                    <Button
                                        sx={{
                                            mt: 3,
                                            textTransform: "capitalize",
                                            width: 153,
                                            color: "black",
                                            borderColor: "black",
                                        }}
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => {
                                            localStorage.clear();
                                            history.push("/");
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </NavLink>
                            </Grid>
                        </Grid>

                        {/* Right Cont */}
                        <Grid
                            container
                            item
                            sx={{ py: 3, px: 3 }}
                            xs={12}
                            md={8}
                            direction="column"
                            alignItems="center"
                        >
                            <Grid
                                container
                                item
                                sx={{
                                    py: 3,
                                    px: 4,
                                    backgroundColor: "white",
                                    minHeight: "75vh",
                                }}
                                xs={12}
                                md={8}
                                direction="column"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <form className="signin-form" onSubmit={Formik.handleSubmit}>
                                    <Grid container direction="column">
                                        {/* Image */}
                                        <Grid sx={{ mt: 3 }} container alignItems="center">
                                            <img
                                                src={img ? img : UserImg}
                                                className="userimg"
                                                alt="..."
                                            />
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
                                        <p className="signin-error register-ml-3">
                                            {Formik.errors.image}
                                        </p>

                                        {/* name */}
                                        <Grid container alignItems="center">
                                            <Grid sx={{ mt: 4 }} item xs={12} md={5}>
                                                <InputText text="First Name*" />
                                                <InputField
                                                    placeholder="Enter Your First Name"
                                                    name="fname"
                                                    value={Formik.values.fname}
                                                    onChange={Formik.handleChange}
                                                    onBlur={Formik.handleBlur}
                                                />
                                                <div style={{ position: "absolute" }}>
                                                    <ErrorMessage
                                                        touched={Formik.touched.fname}
                                                        errors={Formik.errors.fname}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid
                                                sx={{ ml: { xs: 0, md: 5 }, mt: 4 }}
                                                item
                                                xs={12}
                                                md={5}
                                            >
                                                <InputText text="Last Name*" />
                                                <InputField
                                                    placeholder="Enter Your Last Name"
                                                    name="lname"
                                                    value={Formik.values.lname}
                                                    onChange={Formik.handleChange}
                                                    onBlur={Formik.handleBlur}
                                                />
                                                <div style={{ position: "absolute" }}>
                                                    <ErrorMessage
                                                        touched={Formik.touched.lname}
                                                        errors={Formik.errors.lname}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>

                                        {/* Email Phone */}
                                        <Grid container alignItems="center">
                                            <Grid sx={{ mt: 4 }} item xs={12} md={5}>
                                                <InputText text="Email" />
                                                <TextField
                                                    sx={{
                                                        backgroundColor: "#F9F9F9",
                                                        ".MuiOutlinedInput-notchedOutline": {
                                                            outline: "none",
                                                            border: "none",
                                                        },
                                                    }}
                                                    disabled
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Enter Your Email"
                                                    variant="outlined"
                                                    color="warning"
                                                    name="email"
                                                    value={Formik.values.email}
                                                />
                                            </Grid>
                                            <Grid
                                                sx={{ ml: { xs: 0, md: 5 }, mt: 4 }}
                                                item
                                                xs={12}
                                                md={5}
                                            >
                                                <InputText text="Phone*" />
                                                <InputField
                                                    placeholder="Enter Your Phone Number"
                                                    name="phone"
                                                    value={Formik.values.phone}
                                                    onChange={Formik.handleChange}
                                                    onBlur={Formik.handleBlur}
                                                />
                                                <div style={{ position: "absolute" }}>
                                                    <ErrorMessage
                                                        touched={Formik.touched.phone}
                                                        errors={Formik.errors.phone}
                                                    />
                                                </div>
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
                                                <div style={{ position: "absolute" }}>
                                                    <ErrorMessage
                                                        touched={Formik.touched.dob}
                                                        errors={Formik.errors.dob}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid
                                                sx={{ ml: { xs: 1, md: 6 }, mt: 4 }}
                                                item
                                                xs={12}
                                                md={5}
                                            >
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
                                                <div style={{ position: "absolute" }}>
                                                    <ErrorMessage
                                                        touched={Formik.touched.gender}
                                                        errors={Formik.errors.gender}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>

                                        {/* Register */}
                                        <Grid container alignItems="center">
                                            <Grid item xs={12} md={5}>
                                                <ButtonOrange loading={buttonLoading} text="Save" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default Profile;
