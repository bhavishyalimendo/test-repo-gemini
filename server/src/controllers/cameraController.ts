import axios, { AxiosError } from 'axios';
import https from 'https';
import { Request, Response } from 'express';

export const cameraController = {
  getCameras: async (req: Request, res: Response) => {
    try {
     
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

export default cameraController;