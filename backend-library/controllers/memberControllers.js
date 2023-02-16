import Member from "../models/membersModel.js" 

export const createMember = async(req, res) => {
    try {
        await Member.create (req.body);
        res.status(201).json({
            "message": "Member Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllMember = async(req, res) => {
    try{
        const members = await Member.findAll();
        res.json(members);
    }catch(error){
        res.json({message: error.message});
    }
}

