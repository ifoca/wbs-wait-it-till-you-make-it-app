import type { ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler =(err, req, res, next)=>{
    console.log(err)

    res.status(500).json({message: 'something went wrong'});

};
 export default errorHandler;