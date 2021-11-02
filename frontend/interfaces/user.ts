export interface userInfoInterface {
  id: number,
  username: string,
  email: string,
}


export interface userInterface {
  user: userInfoInterface,
  token: string
};

export interface loginInterface {
  username: string,
  password: string
};

