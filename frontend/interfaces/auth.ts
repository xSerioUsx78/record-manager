export interface authInterface {
  user: {
    id: number,
    username: string,
    email: string,
  } | null,
  isAuthenticated: boolean,
  token: string | null,
  isLoading: boolean
};