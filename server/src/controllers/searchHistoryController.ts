   /* import type { RequestHandler } from "express";
    import { SearchHistory } from "#models";


    // Post a search history in the database
    export const addSearchHistory: RequestHandler = async (req, res) => {
        try {
            const {userId, query, successful} = req.body;
            const searchHistory  = await SearchHistory.create({userId,query,successful});
            return res.status(201).json({message:'history added successfully'})
        } catch (error){
            return res.status(500).json({message: 'server timeout, please try again later'})
        }

        };

        // Get search history 
        // the user call on the history after a successful search.
        export const getStationsByCity :RequestHandler = async (req,res)=>{
            try{
                const {userId,query,successful}= req.body
                const history = await SearchHistory.find({userId,query,successful});
                return res.status(200).json({message:'history was saved  successfully'})
        } catch (error){
            return  res.status(500). json ({message : 'serverdown'})

        };
        };
    */
