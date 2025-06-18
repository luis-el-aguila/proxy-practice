// import express
// const express = require("express");
import { Request, Response } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';

// controller function
interface ProxyRequest {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: Record<string, unknown>;
}

export const proxyPost = async (req: Request<{}, {}, ProxyRequest>, res: Response) => {
  try {
    const { url, method, body } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL requerida' });
    }

    if (!['get', 'post', 'put', 'delete'].includes(method)) {
      return res.status(400).json({ error: 'Método HTTP no válido' });
    }

    try {
      const response: AxiosResponse = await axios({
        method,
        url,
        data: body,
        timeout: 30000 // 30 segundos de timeout
      });
      
      res.status(response.status).json(response.data);
    } catch (axiosError) {
      if (axiosError instanceof AxiosError) {
        const { response } = axiosError;
        if (response) {
          return res.status(response.status).json(response.data);
        }
        return res.status(500).json({ error: axiosError.message });
      }
      throw axiosError;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};
