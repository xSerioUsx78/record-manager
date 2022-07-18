export interface authInterface {
  user: {
    id: number;
    username: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
