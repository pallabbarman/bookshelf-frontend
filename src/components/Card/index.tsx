import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IBook } from "types/book";

interface BookCardProps {
    book: IBook;
}

function BookCard({ book }: BookCardProps) {
    console.log(book);
    const { author, genre, image, title, publicationDate } = book;

    const date = new Date(publicationDate);

    return (
        <Grid item>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={author}
                />
                <CardContent>
                    <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
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
            </Card>
        </Grid>
    );
}

export default BookCard;
