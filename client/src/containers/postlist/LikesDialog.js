import { useEffect, useState } from "react";
import { Grid, IconButton, Dialog, DialogContent, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// api
import axios from "axios";

const LikesDailog = ({ open, setOpen, tempId, setTempId }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await axios.get(`http://192.168.1.157:5000/post/like/${tempId}`, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (result.data.status === 1) {
                setUsers(result.data.data);
                setLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [open]);

    return (
        <Dialog
            fullWidth
            open={open}
            scroll="paper"
            maxWidth="sm"
            onClose={() => {
                setTempId(0);
                setOpen(false);
            }}
            sx={{
                ".MuiDialog-paper": {
                    borderRadius: 4,
                    maxHeight: 500,
                },
            }}
        >
            <div className="likes-header">
                <p className="likes-header-text">Liked By</p>
                <IconButton
                    sx={{ position: "absolute", right: 0 }}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
            </div>

            {loading ? (
                <Grid height={100} container justifyContent="center" alignItems="center">
                    <CircularProgress disableShrink />
                </Grid>
            ) : (
                <DialogContent dividers={true}>
                    {users.length !== 0 ? (
                        users.map((user) => {
                            return (
                                <>
                                    <Grid
                                        key={user.id}
                                        sx={{
                                            flexWrap: "nowrap",
                                            mb: 4,
                                            px: 4,
                                        }}
                                        container
                                        alignItems="center"
                                    >
                                        <img
                                            className="postlist-user-img"
                                            src={user.User.image}
                                            alt=""
                                        />
                                        <p className="postlist-username">
                                            {user.User.first_name + " " + user.User.last_name}
                                        </p>
                                    </Grid>
                                </>
                            );
                        })
                    ) : (
                        <>
                            <Grid
                                sx={{
                                    flexWrap: "nowrap",
                                    mb: 4,
                                    px: 4,
                                }}
                                container
                                alignItems="center"
                            >
                                No Likes
                            </Grid>
                        </>
                    )}
                </DialogContent>
            )}
        </Dialog>
    );
};

export default LikesDailog;
