export interface ILoginForm {
    email: string;
    password: string;
  }
  export interface ISignupForm {
    email: string;
    password: string;
  }


export interface IUser  {
  _id: string;
  email: string; 
  featureFlag: boolean, 
};