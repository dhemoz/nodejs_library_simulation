import Borrow from "../models/borrowModel.js" 
import Member from "../models/membersModel.js" 
import Books from "../models/booksModel.js" 
import Book from "../models/booksModel.js"
import * as timeDifference from "time-difference-js";

export const createBorrow = async(req, res) => {
    try {
        const borrow = await Borrow.findAll();
        const members = await Member.findAll({
            where:{
                code:req.body.member_code
            }
        })
        if(members[0]['dataValues']['is_penalty'] == true){
            res.json({ message: "Maaf, anda sedang dalam masa penalty peminjaman" });
        }else{
            if (borrow.length == 0){
                req.body.is_penalty = false;
                await Borrow.create(req.body);
                const books = await Books.findAll({
                    where:{
                        code:req.body.book_code
                    }
                });
                const newBooks = books[0]['dataValues'];
                newBooks.stock = 0;
                await Books.update(newBooks, {
                    where : {
                        code:req.body.book_code
                    }
                })
                res.status(201).json({
                    "message": "Borrow Success!"
                });
            }else{
                const checkCountMembers = await Borrow.findAll({
                    where:{
                        member_code:req.body.member_code
                    }
                })
                if (checkCountMembers.length < 2){
                    const checkBooksBorrow = await Borrow.findAll({
                        where : {
                            member_code:req.body.member_code,
                            book_code:req.body.book_code
                        }
                    })
                    const checkStockBook = await Books.findAll({
                        where : {
                            code:req.body.book_code
                        }
                    })
                    if (checkBooksBorrow.length == 1){
                        res.json({ message: "Maaf, buku nya sama  dipinjam" });
                    }else{
                        if (checkStockBook[0]['dataValues']['stock'] == 0){
                            res.json({ message: "Maaf, stock buku yang ingin dipinjam tidak tersedia" });
                        }else{
                            req.body.is_penalty = false;
                            await Borrow.create(req.body);
                            const books = await Books.findAll({
                                where:{
                                    code:req.body.book_code
                                }
                            });
                            const newBooks = books[0]['dataValues'];
                            newBooks.stock = 0;
                            await Books.update(newBooks, {
                                where : {
                                    code:req.body.book_code
                                }
                            })
                            res.status(201).json({
                                "message": "Borrow Success!"
                            });
                        }
                    }
                }else{
                    res.json({ message: "Maaf, anda sudah meminjam 2 buku" });
                }
            }
        }
        
        // await Book.create (req.body);
        // res.status(201).json({
        //     "message": "Content Created"
        // });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getBook = async(req, res) => {
    try{
        const checkReturnBook = await Borrow.findAll({
            where : {
                book_code : req.body.book_code,
                member_code : req.body.member_code,
            }
        })
        if(checkReturnBook.length == 1){
            var borrowDate = checkReturnBook[0]['dataValues']['createdAt']
            var timestamp = Date.now()
            var returnDate = new Date(timestamp)
            const { getTimeDiff } = timeDifference;
            const result = getTimeDiff (borrowDate,returnDate)
            if((result.suffix == "days") && (result.value > 7)){
                const getMember = await Member.findAll({
                    where : {
                        code : req.body.member_code,
                    }
                })
                const dataMember = getMember[0]['dataValues'];
                dataMember.is_penalty = true;
                try{
                    await Member.update(dataMember, {
                        where : {
                            code : req.body.member_code
                        }
                    });
                    const message = "You received penalty for returning book more than 7 days!"
                    console.log(dataMember)
                }catch(error){
                    console.log(error)
                }
                


            }
            const returnBook = await Borrow.destroy({
            where : {
                book_code : req.body.book_code,
                member_code : req.body.member_code,
            }
            })
           
            const books = await Books.findAll({
                where:{
                    code:req.body.book_code
                }
            });
            const newBooks = books[0]['dataValues'];
            newBooks.stock = 1;
            await Books.update(newBooks, {
                where : {
                    code:req.body.book_code
                }
            });
            res.status(201).json({
                "message": "Return Book Success!"})
        }else{
            res.json({ message: "Maaf buku yang anda kembalikan tidak sesuai dengan yang ada pinjam" });
        }
    }catch (error){
        
    }
}

// export const getAllBook = async(req, res) => {
//     try{
//         const books = await Book.findAll();
//         res.json(books);
//     }catch(error){
//         res.json({message: error.message});
//     }
// }

