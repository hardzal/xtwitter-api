import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to XTwitter API!',
  });
});

router.post('/', (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;

  res.json({
    fullName,
    email,
    address,
  });
});

router.patch('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to PATCH method!',
  });
});

router.delete('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to DELETE method!',
  });
});

export default router;
