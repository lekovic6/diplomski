export class Author{
    _id: string;
    key: string;
    name: string;
    bio: string;
    birth_date: string;
    death_date: string;
    links: {
        title: string,
        url: string,
        type:{
            key: string;
        }
    }[];
    coverData64: string;
    coverContentType64: string;
}
    