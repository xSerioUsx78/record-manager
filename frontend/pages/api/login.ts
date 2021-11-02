import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import requests from '../../utils/requests';
import axios from 'axios';
import { userInterface } from '../../interfaces/user';
import { responseInterface } from '../../interfaces/response';


const login = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  try {
    const { body } = req;
    const resApi: responseInterface = await axios.post(requests.login, body);
    const responseData: userInterface = resApi.data;
    res.setHeader('Set-Cookie', serialize('token', responseData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 365, // One year
      sameSite: 'strict',
      path: '/'
    }));
    res.status(200).json(responseData);
  } catch (e: any) {
    const { response } = e;
    res.status(response.status).json(response.data)
  };
};

export default login;