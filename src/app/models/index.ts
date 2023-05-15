export interface IMovies {
  _id: string;
  Title: string;
  Description: string;
  Genre: {
    Name: string,
    Description: string
  },
  Director: {
    Name: string,
    Bio: string
  },
  imageURL: string,
  Featured: boolean
}
export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserLoginResponse {
  token: string;
  user:{
    FavoriteMovies: string[]
    email: string;
    password: string;
    username: string;
    _id: string;
  }
}

export interface IUserRegister extends IUserLogin{
  email: string;
  birthDate: string,
}

export interface IUser {
  username: string;
  password: string;
  email: string;
  birthDate: string,
  FavoriteMovies: string[]
}

export interface HandleError {
  message: string
}
