import { userInfoInterface } from './user';


export interface recordResultsItemInterface {
  id: number,
  user: userInfoInterface,
  title: string,
  description: string,
  created: string,
  updated: string | null
};

export interface recordItemsInterface {
  count: number,
  next: string | null,
  previous: string | null,
  results: recordResultsItemInterface[] | []
};