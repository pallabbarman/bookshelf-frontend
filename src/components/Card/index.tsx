import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import { IBook } from "types/book";

interface BookCardProps {
    book: IBook;
}

function BookCard({ book }: BookCardProps) {
    console.log(book);
    const { author, genre, image, title, user } = book;
    const { name } = user;

    return (
        <Grid item>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={<Avatar alt={name.firstName} src={image} />}
                    title={title}
                    subheader={author}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={author}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            WebkitLineClamp: "4",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                        }}
                    >
                        {genre}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default BookCard;
