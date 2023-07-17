import { Grid, Paper, Typography } from "@mui/material";
import { IReview } from "types/book";
import formatTimeAgo from "utils/date";

interface CommentProps {
    comment: IReview;
}

const Comment = ({ comment }: CommentProps) => {
    const date = formatTimeAgo(comment.date as Date);
    return (
        <Paper>
            <Grid
                container
                sx={{
                    width: { md: 1000, sm: 500, xs: 300 },
                    marginTop: "1rem",
                }}
            >
                <Grid item sx={{ padding: "20px" }}>
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
                    <Typography color="text.secondary" mt={1}>
                        {date}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Comment;
