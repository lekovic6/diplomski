export class Book{
    _id:string;
    openlibrary_work: string;
    isbn:string;

    title: string;
    authors: [
        {
            name: string,
            key: string
        }
    ];
    description:string;

    genre:string;
    first_publish_year: number;

    cover_id: number;
    coverData64: string;
    coverContentType64: string;
}
    