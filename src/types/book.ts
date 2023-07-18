import { IUser } from "./user";

export interface IReview {
    id?: string;
    reviewer: IUser;
    comment: string;
    date?: Date;
}

export interface IBook {
    id?: string;
    title: string;
    author: string;
    genre: string;
    image?: string;
    publicationDate: Date | null;
    user: IUser | string;
    reviews?: IReview[];
}
