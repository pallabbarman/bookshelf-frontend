import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { IReview } from "types/book";

interface CommentProps {
    comment: IReview;
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <Paper
            sx={{
                width: { md: 1000, sm: 500, xs: 300 },
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{ padding: { md: "20px" }, margin: "1rem" }}
            >
                <Grid item>
                    <Avatar alt={comment.reviewer.name.firstName} src={""} />
                </Grid>
                <Grid item>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: { md: "1rem" },
                        }}
                    >
                        {comment.reviewer.name.firstName}{" "}
                        {comment.reviewer.name.lastName}
                    </Typography>
                    <Typography>{comment.comment}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Comment;
