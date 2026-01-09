import axios, { AxiosError } from 'axios';
import https from 'https';
import { Request, Response } from 'express';

export const authController = {
  getToken: async (req: Request, res: Response) => {
    try {
      const { username, password, client_id = 'GrantValidatorClient' } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          error: 'Missing required fields',
          message: 'username and password are required'
        });
      }

      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', username);
      params.append('password', password);
      params.append('client_id', client_id);

      const response = await axios.post(
        'https://hx-pc28026d/API/IDP/connect/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false
          })
        }
      );

      res.json(response.data);
    } catch (error) {
      const err = error as AxiosError;
      const message = err instanceof Error ? err.message : String(error);
      console.error('Error getting token:', message);

      if (err.response) {
        res.status(err.response.status).json({
          error: 'Failed to get token',
          message: err.response.data || message
        });
      } else if (err.request) {
        res.status(503).json({
          error: 'Service unavailable',
          message: 'Unable to reach authentication server'
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message
        });
      }
    }
  }
};

export default authController;