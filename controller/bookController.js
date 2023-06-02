const query = require("../db/query");
const dbconnection = require("../db/connection");


//get all books
exports.getBookList = async (req, res) => {
    try {
        var getBookList = query.query.getAllBooks
        var result = await dbconnection.query(getBookList)
        console.log(result.rows)
        res.status(200).send(result.rows)
    } catch (error) {
        res.status(500).send("error" + error)
    }

}


//get book details
exports.getBookDetails = async (req, res) => {
    try {
        var id = req.params.id;
        if (!id) {
            res.status(500).send("id must be entered");
        }


        var getBookDetails = query.query.getBookDetails
        var result = await dbconnection.query(getBookDetails, [id])
        console.log(result)
        if (result.rowCount == 0) {
            res.status(500).send("id doesn't exist");

        } else {
            res.status(200).send(JSON.stringify(result.rows));

        }

    } catch (error) {
        res.status(500).send("error" + error)

    }
}


//save book
exports.saveBook = async (req, res) => {
    try {
        var title = req.body.title
        var isbn = req.body.isbn
        var desc = req.body.desc
        var auther = req.body.auther
        var publisher = req.body.publisher
        var pages = req.body.pages
        var bStoreCode = req.body.bStoreCode

        var storeCodeQuery = query.query.getStoreCode;
        var storeCode = await dbconnection.query(storeCodeQuery);
        var storeCodeArray = storeCode.rows;
        var result = storeCodeArray.filter((item) => {
            return item.code == bStoreCode
        });

        var values = [title, isbn, desc, auther, publisher, pages, bStoreCode]
        if (!title || !auther || !publisher) {
            res.status(500).send("ititle, autherand publisher must be entered");

        } else if (result.length == 0) {
            res.status(500).send("storecode dosn't exist ");

        } else {
            await dbconnection.query(query.query.saveBook, values)

            res.status(201).send("book is saved")
        }


    } catch (error) {
        res.status(500).send("error" + error)
    }
}



//update book
exports.updateBook = async (req, res) => {
    try {
        var id = req.params.id
        var title = req.body.title
        var isbn = req.body.isbn
        var desc = req.body.desc
        var auther = req.body.auther
        var publisher = req.body.publisher
        var pages = req.body.pages
        var bStoreCode = req.body.bStoreCode

        var values = [title, isbn, desc, auther, publisher, pages, bStoreCode, id]

        var storeCodeQuery = query.query.getStoreCode;
        var storeCode = await dbconnection.query(storeCodeQuery);
        var storeCodeArray = storeCode.rows;
        var result = storeCodeArray.filter((item) => {
            return item.code == bStoreCode
        });

        var idQuery = query.query.getBookId;
        var idInDb = await dbconnection.query(idQuery)
        var idArray = idInDb.rows
        var arrResult = idArray.filter((item) => {
            return item.bookid == id
        });
        console.log(arrResult)


        if (arrResult.length == 0) {
            res.status(500).send("id doesn't exist");
        }
        else if (!title || !auther || !publisher) {
            res.status(500).send("ititle, autherand publisher must be entered");

        } else if (result.length == 0) {
            res.status(500).send("storecode dosn't exist ");

        } else {
            await dbconnection.query(query.query.updateBook, values)

            res.status(200).send("book is updated")
        }


    } catch (error) {
        res.status(500).send("error" + error)

    }
}


//delete book

exports.deleteBook = async (req, res) => {
    try {
        var id = req.params.id
        var deleteQuery = query.query.deleteBook

        if (!id) {
            res.status(500).send("id must be entered");
        }


        var getBookDetails = query.query.getBookDetails
        var result = await dbconnection.query(getBookDetails, [id])
        console.log(result)
        if (result.rowCount == 0) {
            res.status(500).send("id doesn't exist");

        } else {
            await dbconnection.query(deleteQuery, [id])
            res.status(200).send("book is deleted")
        }


    } catch (error) {
        res.status(500).send("error" + error)

    }


}