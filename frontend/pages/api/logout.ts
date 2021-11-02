import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import requests from '../../utils/requests';
import authAxios from '../../utils/axios';


const logout = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  try {
    const { token } = req.body;
    await authAxios(token).post(requests.logout, {});
    res.setHeader('Set-Cookie', serialize('token', '', {
      maxAge: -1,
      path: '/'
    }));
    res.status(200).json({});
  } catch (e: any) {
    const { response } = e;
    res.status(response).json(response.data);
  };
};

export default logout;