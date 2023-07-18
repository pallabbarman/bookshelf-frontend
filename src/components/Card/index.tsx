import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IBook } from "types/book";

interface BookCardProps {
    book: IBook;
}

function BookCard({ book }: BookCardProps) {
    const { author, genre, image, title, publicationDate, id } = book;

    const date = new Date(publicationDate as Date);

    return (
        <Grid item>
            <Card sx={{ width: 300 }}>
                <Box
                    component={Link}
                    to={`/books/${id as string}`}
                    sx={{ textDecoration: "none" }}
                >
                    <CardMedia
                        component="img"
                        height="194"
                        image={image}
                        alt={author}
                    />
                    <CardContent>
                        <Typography
                            color="text.secondary"
                            sx={{ fontWeight: 700 }}
                        >
                            {title}
                        </Typography>
                        <Typography color="text.secondary">
                            Author: {author}
                        </Typography>
                        <Typography color="text.secondary">
                            Genre: {genre}
                        </Typography>
                        <Typography color="text.secondary">
                            Publication Date: {date.toLocaleDateString()}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    );
}

export default BookCard;
