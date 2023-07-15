import { IUser } from "./user";

export interface IReview {
    reviewer: IUser;
    rating: number;
    comment: string;
}

export interface IBook {
    id: string;
    title: string;
    author: string;
    genre: string;
    image: string;
    publicationDate: Date;
    user: IUser;
    reviews?: IReview[];
}
