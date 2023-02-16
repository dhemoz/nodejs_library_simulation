import express from "express";
import bodyParser from "body-parser";
import{
    createBook,
    getAllBook
} from "../controllers/booksControllers.js";
import{
    createMember,
    getAllMember
} from "../controllers/memberControllers.js";
import{
    createBorrow,
    getBook
} from "../controllers/borrowControllers.js";

const router = express.Router();
var jsonParser = bodyParser.json ();

// API BOOK
router.post('/create-book', jsonParser, createBook);
router.get('/list-book', getAllBook);

// API MEMBER
router.post('/create-member', jsonParser, createMember);
router.get('/list-member', getAllMember);

// API BORROW
router.post('/create-borrow', jsonParser, createBorrow);
router.post('/return-book', jsonParser, getBook);

export default router;
