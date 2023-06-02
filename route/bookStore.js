const express=require("express");
const router=express.Router();
const bookController=require("../controller/bookController");

router.get("/book",bookController.getBookList);
router.get("/book/details/:id",bookController.getBookDetails);

router.post("/book/save",bookController.saveBook);

router.put("/book/update/:id",bookController.updateBook);

router.delete("/book/delete/:id",bookController.deleteBook);


module.exports=router;