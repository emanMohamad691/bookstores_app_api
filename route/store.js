const express=require("express");
const router=express.Router();
const storeController=require("../controller/storeController");

router.get("/store",storeController.getAllStores);
router.get("/store/details/:id",storeController.getStoreDetails);

router.post("/store/save",storeController.saveStore);

router.put("/store/update/:id",storeController.updateStore);

router.delete("/store/delete/:id",storeController.deleteStore);


module.exports=router;