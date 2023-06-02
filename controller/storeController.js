const query = require("../db/query");
const dbConnection = require("../db/connection");
const generation = require("../util/generator");


//get all store
exports.getAllStores = async (req, res) => {
    try {
        var queryText = query.query.getAllStores;
        var result = await dbConnection.query(queryText);
        return res.status(200).send(JSON.stringify(result.rows));

    } catch (error) {
        return res.status(500).send("error" + error);
    }
}


//get details of one store
exports.getStoreDetails = async (req, res) => {
    try {
        var id = req.params.id;

        if (!id) {
            res.status(500).send("id must be entered");
        }


        var getStoreDetailsQuery = query.query.getStoreDetails;
        var result = await dbConnection.query(getStoreDetailsQuery, [id]);
        console.log(result)
        if (result.rowCount == 0) {
            res.status(500).send("id doesn't exist");

        } else {
            res.status(200).send(JSON.stringify(result.rows));

        }


    } catch (error) {

        res.status(500).send("error" + error);

    }


}


// save new store
exports.saveStore = async (req, res) => {
    try {
        var storename = req.body.storename;
        var storeCode = generation.generationStoreCode();
        var address = req.body.address;
        var saveQuery = query.query.saveStore;
        var values = [storename, storeCode, address];
        console.log(storename)
        if (!storename || !address) {
            res.status(500).send("storename and address must be entered");

        } else {
            await dbConnection.query(saveQuery, values);
            return res.status(201).send("store saved")
        }



    } catch (error) {
        return res.status(500).send("error" + error);
    }
}

// update store
exports.updateStore = async (req, res) => {
    try {
        var storeId = req.params.id;
        var storeCode = generation.generationStoreCode();
        var storename = req.body.storename;
        var address = req.body.address;

        var idQuery = query.query.getid;
        var idInDb = await dbConnection.query(idQuery)
        var idArray = idInDb.rows
        var arrResult = idArray.filter((item) => {
            return item.storeid == storeId
        });
        console.log(arrResult)

        var updateStore = query.query.updateStore;
        var values = [storename, storeCode, address, storeId];
        if (!storeId) {
            res.status(500).send("id must be entered")

        }
        else if (arrResult.length == 0) {
            res.status(500).send("id dosn't exist")
        }
        else if (!storename || !address) {
            res.status(500).send("storename and address must be entered");

        }
        else {
            await dbConnection.query(updateStore, values);
            res.status(200).send("store is updated")
        }

    } catch (error) {
        return res.status(500).send("error" + error);

    }
}

//delete store
exports.deleteStore = async (req, res) => {
    try {
        var storeId = req.params.id;
        var deleteQuery = query.query.deleteStore
        var idQuery = query.query.getid;
        var idInDb = await dbConnection.query(idQuery)
        idArray = idInDb.rows
        var arrResult = idArray.filter((item) => {
            return item.storeid == storeId
        });
        console.log(arrResult)


        if (!storeId) {
            res.status(500).send("id must be entered")

        }
        else if (arrResult.length == 0) {
            res.status(500).send("id dosn't exist")
        }

        else {
            await dbConnection.query(deleteQuery, [storeId])
            return res.status(200).send("store is deleted")
        }



    } catch (error) {
        return res.status(500).send("error" + error);

    }

}