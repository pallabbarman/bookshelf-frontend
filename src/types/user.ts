export interface UserName {
    firstName: string;
    lastName: string;
}

export interface IUser {
    id?: string;
    name: UserName;
    email: string;
    password: string;
    role?: string;
    address?: string;
    wishlist?: string[];
    currentlyReading?: {
        book: string;
        startDate?: Date;
        finished?: boolean;
    }[];
    finishedReading?: {
        book: string;
        startDate?: Date;
        endDate?: Date;
    }[];
}
