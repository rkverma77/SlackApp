import { StatusCodes } from 'http-status-codes';

import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../common/responseObject.js';
import { signUpService } from '../service/userService.js';



export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    
    const user = await signUpService(req.body);

    console.log(user);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User Created Sucessfully'));
  } catch (error) {
    console.log('sign up controller error : ', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
