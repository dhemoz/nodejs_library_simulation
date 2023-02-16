import Book from "../models/booksModel.js" 

export const createBook = async(req, res) => {
    try {
        await Book.create (req.body);
        res.status(201).json({
            "message": "Content Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllBook = async(req, res) => {
    try{
        const books = await Book.findAll();
        res.json(books);
    }catch(error){
        res.json({message: error.message});
    }
}

