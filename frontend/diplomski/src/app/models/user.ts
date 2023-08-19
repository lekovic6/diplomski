export class User{
    // for all - user and admin
    username:string;
    password:string;

    firstname:string;
    lastname:string;

    email:string;
    role:string;

    profilePicture:{
        data: string;
        contentType: string;
    };

    favouritesList:string[];

}
    