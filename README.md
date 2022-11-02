# energiesparen
Energiespar-Tipps-App

## Vorschlag zur User-Datenstruktur
[{
    id: String,
    userName: String,
    loginName: String,
    Password: String,
    FirstName: String,
    LastName: String,
    email: String,
    website: String,
    message: String,
    postsCounter: Integer,
    likesCounter: Integer,
    posts:
    [{
        id: String,
        index: Integer,
        date: String,
        title: String,
        text: String,
        link: String,
        picture:  ,
        comments: [{
            id: String,
            text: String
        }]
    }]
}]
