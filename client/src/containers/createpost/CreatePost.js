/** @format */

import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
//css
import "src/containers/createpost/createpost.css";
//api
import axios from "axios";

const Posts = () => {
    document.body.style.backgroundColor = "#E5E5E5";
    const snackbar = useSnackbar();
    const history = useHistory();

    const [inputMedia, setInputMedia] = useState([]);
    const [displayMedia, setDisplayMedia] = useState([]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (description === "" && inputMedia.length === 0) {
            setError("Required");
        } else {
            setError("");
            setLoading(true);
            const formData = new FormData();
            // sending whole array will not work
            inputMedia.forEach((media) => {
                formData.append("media", media);
            });
            formData.append("description", description);

            const result = await axios.post(`http://192.168.1.157:5000/post/post`, formData, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (result.data.status === 1) {
                snackbar.enqueueSnackbar(result.data.message, { variant: "success" });
                setLoading(false);
                history.push("/postlist");
            } else {
                setLoading(false);
                snackbar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        }
    };

    const handleInput = (event) => {
        if (event.target.files !== undefined) {
            let disTemp = [];
            // eslint-disable-next-line
            Array.from(event.target.files).map((file) => {
                disTemp.push({ type: file.type, url: URL.createObjectURL(file) });
            });
            setInputMedia(inputMedia.concat([...event.target.files]));
            setDisplayMedia(displayMedia.concat([...disTemp]));
        }
    };

    return (
        <>
            <Grid sx={{ minHeight: "100vh", pt: "calc(5vh + 20px)" }} container>
                <Grid item xs={12} md={7} sx={{ px: 5, py: 3 }}>
                    <p className="posts-heading">Create Post</p>
                    <p className="posts-desc">Add a Description</p>

                    {/* Description input */}
                    <TextField
                        sx={{ backgroundColor: "white" }}
                        name="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        fullWidth
                        placeholder="Add Post Description"
                        multiline
                        rows={10}
                    />

                    <p className="signin-error">{error}</p>
                    {/* Add Media */}
                    <Grid sx={{ mt: 2 }} container>
                        <label htmlFor="posts-media-input">
                            <input
                                style={{ display: "none" }}
                                accept="video/*,image/*"
                                id="posts-media-input"
                                multiple
                                type="file"
                                onChange={handleInput}
                            />
                            <Button
                                sx={{
                                    bgcolor: "#FF7F00",
                                    textTransform: "capitalize",
                                    color: "white",
                                    borderColor: "white",
                                    ":hover": {
                                        borderColor: "white",
                                        bgcolor: "#FF7F00",
                                    },
                                }}
                                disableElevation
                                variant="contained"
                                component="span"
                            >
                                Add Media
                            </Button>
                        </label>
                    </Grid>

                    {/* Show Selected Medias */}
                    <Grid sx={{ my: 3 }} container alignItems="center">
                        {displayMedia.map((media, index) => {
                            if (media.type.includes("image")) {
                                return (
                                    <img
                                        key={index}
                                        className="posts-image"
                                        src={media.url}
                                        alt="..."
                                    />
                                );
                            } else {
                                return (
                                    <video
                                        key={index}
                                        style={{
                                            marginRight: 20,
                                            marginBottom: 20,
                                        }}
                                        width="144"
                                        height="100%"
                                        autoPlay
                                        controls
                                    >
                                        <source src={media.url} type="video/*" />
                                    </video>
                                );
                            }
                        })}
                    </Grid>
                    <Grid
                        sx={{ backgroundColor: "white", p: 3 }}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <NavLink className="navlink-common" to="/postlist">
                            <Button
                                sx={{
                                    mr: 3,
                                    textTransform: "capitalize",
                                    color: "#222A33",
                                }}
                                variant="text"
                            >
                                Cancel
                            </Button>
                        </NavLink>
                        <LoadingButton
                            loading={loading}
                            sx={{
                                bgcolor: "#FF7F00",
                                textTransform: "capitalize",
                                color: "white",
                                borderColor: "white",
                                ":hover": {
                                    borderColor: "white",
                                    bgcolor: "#FF7F00",
                                },
                            }}
                            disableElevation
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Create Post
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Posts;
