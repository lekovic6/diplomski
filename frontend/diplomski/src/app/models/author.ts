export class Author{
    
    key: string;
    name: string;
    bio: string;
    birth_date: string;
    death_date: string;
    links: [
        {
            url: string,
            title: string,
            type:{
                key: string;
            }
        }
    ];
    

}
    