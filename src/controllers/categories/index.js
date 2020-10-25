const assert = require("assert");
const { createOne, getAll,  update, deleteOne } = require('../../model/categories');
const Inventory = require('../../model/inventory/inventoryModel');  
const category = {};

category.Create = async (req, res, next) => {
    try {
        const { name, gonextId } = req.body;
        assert(name, "name is required");
        let data = await createOne({ 
            name,
            orgId: gonextId
        });
        if(data && data._id) {
            let tags = await getAll({orgId: gonextId});
            res.status(200).json({
                data: tags,
                status: 1,
                message: 'Created successfully'           
            })
        } else {
            res.status(200).json({
                status: 2,
                message: 'Failed'
            })
        }
        
    } catch(e) {
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        if(e.code === 11000) { 
           return res.status(200).json({
                status: 2,
                message: "Category already present"
            });     
        }
        next(e);
    }
}

category.getAll = async (req, res, next) => {
    try {     
        const { gonextId } = req.body;
        let data = await getAll({ orgId: gonextId });
        res.status(200).json({
            data,
            status: 1,
            message: 'success'           
        })
    } catch(e) {
        next(e);
    }
}

category.editCategory = async (req, res, next) => {
    try {
        const { name , gonextId } = req.body;
        const {categoryId} = req.query;
        assert(categoryId, "categoryId is required");
        assert(name, "name is required");
        let data = await update(categoryId, {name});
        if(data && data._id) {
            let tags = await getAll({orgId: gonextId});
            res.status(200).json({
                data: tags,
                status: 1,
                message: 'updated successfully'           
            })
        } else {
            res.status(200).json({
                status: 2,
                message: 'Failed'
            })
        }
    } catch(e) {
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        } 
        if(e.code === 11000) { 
            return res.status(200).json({
                 status: 2,
                 message: "Category already present"
             });     
         }
        next(e);
    }
}

category.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.query;
        assert( categoryId, "categoryId is required");

        let data = await deleteOne(categoryId);

        await Inventory.deleteMany({ category: categoryId });

        if(data && data._id) {
            let tags = await getAll({ orgId: req.body.gonextId });
            res.status(200).json({
                data: tags,
                status: 1,
                message: 'deleted successfully'           
            })
        } else {
            res.status(200).json({
                status: 2, 
                message: 'Failed'
            })
        }
    } catch(e) {
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
}

 
module.exports = category;
