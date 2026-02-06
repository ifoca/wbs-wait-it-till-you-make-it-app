import type { ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler =(err, req, res, next)=>{
    console.log(err)

    res.status((err as any).status||500).json({message: err.message||'something went wrong'});

};
 export default errorHandler;