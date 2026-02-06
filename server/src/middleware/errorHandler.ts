import type { ErrorRequestHandler } from 'express';

const errorHandler:ErrorRequestHandler =(err, req, res, next)=>{
    console.log(err.message);

    res.status(500).json({message: err.message});

  res.status(500).json({ message: 'something went wrong' });
};
export default errorHandler;
