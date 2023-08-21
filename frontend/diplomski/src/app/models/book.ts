export class Book{
    _id:string;
    openlibrary_work: string;
    isbn:string;

    title: string;
    authors: {
        // ovde cu morat dodat _id authora
        _id: string,
        name: string,
        key: string
    }[];
    description:string;

    genre:string;
    first_publish_year: number;

    cover_id: number;
    coverData64: string;
    coverContentType64: string;

    reviews:[Review]
    
    averageRating?:number;
}
    
export class Review{
    username:string;
    rating:number;
    comment:string;

    pending:boolean;
    accepted:boolean;
    declined:boolean;
}