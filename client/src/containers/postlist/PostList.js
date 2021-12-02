/** @format */

import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Grid, IconButton, CircularProgress } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
//css
import "src/containers/postlist/postlist.css";
// api
import axios from "axios";
// likeDialog
import LikesDialog from "src/containers/postlist/LikesDialog";

const PostList = () => {
    document.body.style.backgroundColor = "#E5E5E5";
    const snackBar = useSnackbar();

    const [posts, setPosts] = useState([]);
    const [tempId, setTempId] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await axios.get("http://192.168.1.157:5000/post/post", {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (result.data.status === 1) {
                setPosts(result.data.data);
                setLoading(false);
            } else {
                setLoading(false);
                snackBar.enqueueSnackbar(result.data.message, { variant: "error" });
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleLike = async (id) => {
        const result = await axios.post(
            "http://192.168.1.157:5000/post/like",
            {
                id: id,
            },
            {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            }
        );

        if (result.data.status === 1) {
            snackBar.enqueueSnackbar(result.data.message, { variant: "success" });
        } else {
            snackBar.enqueueSnackbar(result.data.message, { variant: "error" });
        }
    };

    return (
        <>
            <Grid sx={{ py: 2, px: 3, pt: "calc(5vh + 40px)" }} container direction="column">
                <p className="posts-heading">Post List</p>

                {loading ? (
                    <Grid
                        sx={{ height: "82vh" }}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CircularProgress disableShrink />
                    </Grid>
                ) : (
                    posts.map((post) => {
                        return (
                            <>
                                <Grid
                                    key={post.id}
                                    sx={{
                                        mt: 3,
                                        px: { xs: 1, md: 3 },
                                        py: 2,
                                        backgroundColor: "white",
                                        borderRadius: "4px",
                                    }}
                                    container
                                    direction="column"
                                >
                                    {/* post-header */}
                                    <Grid
                                        sx={{ flexWrap: "nowrap" }}
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <img
                                            className="postlist-user-img"
                                            src={post.User.image}
                                            alt="..."
                                        />
                                        <Grid container direction="column">
                                            <p className="postlist-username">
                                                {post.User.first_name + " " + post.User.last_name}
                                            </p>
                                            <Grid container direction="row" alignItems="center">
                                                <div className="postlist-time">
                                                    <DateRangeOutlinedIcon
                                                        sx={{
                                                            color: "#9494AE",
                                                            mr: 1,
                                                        }}
                                                    />

                                                    <p className="postlist-details">
                                                        {post.createdAt.slice(0, 10)}
                                                    </p>
                                                </div>
                                                <div className="postlist-time">
                                                    <AccessTimeOutlinedIcon
                                                        sx={{
                                                            color: "#9494AE",
                                                            mr: 1,
                                                            ml: { xs: 0, sm: 1 },
                                                        }}
                                                    />
                                                    <p className="postlist-details">
                                                        {post.createdAt.slice(11, 19)}
                                                    </p>
                                                </div>
                                                <div className="postlist-time">
                                                    <IconButton
                                                        sx={{
                                                            ml: {
                                                                xs: 0,
                                                                sm: 1,
                                                            },
                                                        }}
                                                        onClick={() => {
                                                            handleLike(post.id);
                                                        }}
                                                    >
                                                        <ThumbUpOutlinedIcon
                                                            sx={{
                                                                color: "#9494AE",
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <p
                                                        className="postlist-likes"
                                                        onClick={() => {
                                                            setTempId(post.id);
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        likes
                                                    </p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Grid>

                                    {/* post description */}
                                    <Grid
                                        sx={{
                                            my: 3,
                                            maxWidth: { xs: "100%", md: "75%" },
                                        }}
                                    >
                                        <p className="postlist-description">{post.description}</p>
                                    </Grid>

                                    {/* post-media */}
                                    <Grid container>
                                        {post.post_media.map((media) => {
                                            if (media.type === "image") {
                                                return (
                                                    <img
                                                        key={media.media}
                                                        className="postlist-image"
                                                        src={media.media}
                                                        alt="..."
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <video
                                                        key={media.media}
                                                        style={{
                                                            marginRight: 20,
                                                            marginBottom: 20,
                                                        }}
                                                        width="144"
                                                        height="100%"
                                                        autoPlay
                                                        controls
                                                    >
                                                        <source
                                                            src={media.media}
                                                            type="video/mp4"
                                                        />
                                                    </video>
                                                );
                                            }
                                        })}
                                    </Grid>
                                </Grid>
                            </>
                        );
                    })
                )}
            </Grid>

            {/* Likes Dialog */}
            <LikesDialog open={open} setOpen={setOpen} tempId={tempId} setTempId={setTempId} />
        </>
    );
};

export default PostList;
