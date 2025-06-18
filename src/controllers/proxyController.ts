// import express
// const express = require("express");
import { Request, Response } from 'express';
import axios from 'axios';

// controller function
export const proxyPost = async (req: Request, res: Response) => {
  // original code
  // try {
  //   const { url, method, body } = req.body;
  //   if (!url) {
  //     return res.status(400).json({ error: 'URL requerida' });
  //   }
  //   const response = await axios({
  //     method,
  //     url,
  //     data: body
  //   });
  //   res.json(response.data);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }

  try {
    const { url, method, body } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL requerida' });
    }
    const response = await axios({
      method: method as 'get' | 'post' | 'put' | 'delete',
      url,
      data: body
    });
    res.json(response.data);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};
