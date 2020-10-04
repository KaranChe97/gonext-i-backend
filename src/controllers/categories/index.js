const assert = require("assert");
const { slugify } = require('../../helpers');
const { createOne, update, findOne, findByIdAndUpdate, deleteOne, deleteMany, getAll , aggregate } = require('../../model/categories');

const category = {};

const buildAncestors = async (id, parent_id) => {
    let ancest = [];
    try {
            let parent_category = await findOne({ "_id": parent_id },{ "name": 1, "slug": 1, "ancestors": 1 });
            if( parent_category ) {
                const { _id, name, slug } = parent_category;
                const ancest = [...parent_category.ancestors];
                ancest.unshift({ _id, name, slug })
                await findByIdAndUpdate(id, { $set: { "ancestors": ancest } });
            }
        } catch (e) {
            console.log(e); 
            if(e.code === 'ERR_ASSERTION') {
                e.status = 200; 
            }
            next(e);
        }
}

const buildHierarchyAncestors = async (category_id, parent_id) => {
    if (category_id && parent_id) {
        buildAncestors(category_id, parent_id)
    }
    const result = await getAll({ 'parent': category_id }).exec();
    if(result) {
       result.forEach((doc) => {
          buildHierarchyAncestors(doc._id, category_id)})
    }
}    

category.create = async (req,res,next) => {
    assert(req.body.name, "name is required");
    let parent = req.body.parent ? req.body.parent : null;
    let saveData = {name: req.body.name, parent};
    try {
        let newCategory = await createOne(saveData);
       await buildAncestors(newCategory._id, parent);
        return res.status(200).send({ 
            status: 1, 
            response: `Category ${newCategory._id}` 
        });
    } catch (e) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}

category.getAll = async (req,res,next) => {

    try {
        console.log(req.query.slug);
        let condition = {
            slug: req.query.slug, 
        }
        if(!req.query.slug) {
            condition = { parent: null }
        }
        const result = await getAll(condition)
        .select({
        "_id": true, 
        "name": true,
        "slug": true,
        "ancestors.slug": true,
        "ancestors.name": true }).exec();   

        res.status(200).json({
            status: 1,
            data: result
        })

    } catch (e) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}

category.listSub = async (req, res, next) => {
    try {
        assert(req.query.category_id, "category_id is required");
        const result = await getAll({ "ancestors._id": req.query.category_id })
        .select({ "_id": true, "name": true, "slug": true })
        .exec();

        res.status(200).json({
            status: 1,
            data: result
        })

    } catch (e) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}

category.shiftParent = async (req, res, next) => {
    try {
        assert(req.body.category_id, "current parent id is required");
        assert(req.body.new_parent_id, "new parent id is required");
        const category = await findByIdAndUpdate(category_id, { $set: { "parent": new_parent_id } });
        buildHierarchyAncestors(category._id, new_parent_id);
        return res.status(200).json({
            status: 1,
            message: 'Category moved',
            data: category
        });

    } catch(err) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}


category.editCategory =  async (req, res, next) => {
    try {
        assert(req.body.category_id, "current parent id is required");
        assert(req.body.category_name, "category name is required");
        const {category_id, category_name} = req.body;

        const category = await findByIdAndUpdate(category_id, { $set: { "name": category_name, "slug": slugify(category_name) } });
        await update({"ancestors._id": category_id},
                    {"$set": {"ancestors.$.name": category_name, "ancestors.$.slug": slugify(category_name) }}, 
                    {multi: true});
        return res.status(200).json({
            status: 1,
            message: 'Category updated',
            data: category
        });

    } catch(err) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}

category.deleteCategory =  async (req, res, next) => {
    try {
        assert(req.query.category_id, "category_id is required");

        const { category_id } = req.query;

        let err = await deleteOne(category_id);
        if(!err) {
            result = await deleteMany({"ancestors._id": category_id});
        }

        return res.status(200).json({
            status: 1,
            message: 'Category deleted',
        });

    } catch(e) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}


category.displayNested = async (req,res, next)  => {
    try {

        let condition = [ { $group: { _id: "$parent" } }];
        const result = await aggregate(condition);

        return res.status(200).json({
            status: 1,
            data: result
        })

    } catch (e) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}

 
module.exports = category;
