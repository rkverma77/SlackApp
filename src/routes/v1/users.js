import express from 'express';

import { signUp } from '../../controllers/userController.js';

const router = express.Router();

router.post('/signup' , signUp)

// router.get('/', (req, res) => {
//   return res.status(200).json({ messgae: 'GET /users' });
// });

export default router;
