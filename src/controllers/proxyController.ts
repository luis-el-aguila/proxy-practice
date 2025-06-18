// import express
// const express = require("express");
import { Request, Response } from 'express';
import axios from 'axios';

// controller function
interface ProxyRequest {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
}

export const proxyPost = async (req: Request, res: Response) => {
  try {
    const { url, method, body }: ProxyRequest = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL requerida' });
    }
    
    const response = await axios({
      method,
      url,
      data: body
    });
    
    res.json(response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};
