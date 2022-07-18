import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import requests from "../../utils/requests";
import axios from "../../utils/axios";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await axios(req.headers.cookie).post(requests.logout, {});
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        maxAge: -1,
        path: "/",
      })
    );
    res.status(200).json({});
  } catch (e: any) {
    const { response } = e;
    res.status(response).json(response.data);
  }
};

export default logout;
