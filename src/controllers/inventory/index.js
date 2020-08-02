const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/inventory");
const { filterByDelivery } = require("../../model/transactions");
const inventory = {};

inventory.getAll = async (req, res, next) => {  
    try{
        const filterArray = [];
        const { gonextId }  = req.body;
        filterArray.push({ organizationID: gonextId });
        filterArray.push({"transactionCode": { "$in": [3]}});
        const data = await getAll(gonextId);
        const deliveryData = await filterByDelivery(filterArray);
        const neededStock = data.map(d => { return {
            itemId: d._id,
            name: d.name,
            needed: 0
        }  });
        for( const i in deliveryData){
            const { items } = deliveryData[i];
            for (const j in items){
                let sIdx = neededStock.findIndex(e => e.itemId.equals(items[j].itemId));
                if(sIdx > -1){
                    neededStock[sIdx].needed += items[j].quantity
                } else {
                    neededStock.push({
                        itemId: items[j].itemId,
                        name: items[j].name,
                        needed: items[j].quantity
                    })
                }
            }
        }
        res.status(200).json({
            status : 1,
            message : "success",
            data,
            neededStock,
        });
    }catch(e){
        next(e);
    }
};

inventory.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.itemId);        
        res.status(200).json({  
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

inventory.create = async (req, res, next) => {
    try{
        req.body.organizationID = req.body.gonextId;
        const data = await createOne(req.body);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){ 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
};

inventory.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.inventory);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

inventory.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.itemId, req.body);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

inventory.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.itemId);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = inventory;