import type { RequestHandler } from 'express';
import {Stations} from '#models';

   //Get all cities

  export const getCities :RequestHandler = async(req,res)=>{
    const cities =await Stations.find({}).select('cityName')
    
if(!cities){
   return res.status(404).json({message:'no city found'});
}
    return res.status(200).json(cities);
}

// get Stations

  export const getStationsByCity :RequestHandler = async(req, res) =>{
    const {cityName}= req.params;
    const stations = await Stations.find({cityName})
    if (!stations){
        return res.status(404).json({message:'no stations found'})
    }
    return res.status(200).json(stations);
 };

 //post add station

 export const addStation:RequestHandler= async(req,res)=>{
    const station = await Stations.create(req.body);
    if (!station){
        return res.status(400).json({message:'failed to add station'});
    }
    return res.status(201).json({message:'station added successfully'});
 }