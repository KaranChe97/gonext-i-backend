const assert = require('assert');
const { update } = require('../../model/categories');

const { createOne,  updateTag, getAll, deleteTag } = require('../../model/tags');

const Tags = {};

Tags.CreateTag = async (req, res, next) => {
    try {
        const { name } = req.body;
        assert(name, "name is required");
        let data = await createOne({name});
        if(data && data._id) {
            let tags = await getAll({});
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
            e.status = 200;
            e.message = "Tag already present";
        }
        next(e);
    }
}

Tags.getAll = async (req, res, next) => {
    try {     
        let data = await getAll({});
        res.status(200).json({
            data,
            status: 1,
            message: 'success'           
        })
    } catch(e) {
        next(e);
    }
}

Tags.editTag = async (req, res, next) => {
    try {
        const { name } = req.body;
        const {tagId} = req.query;
        assert(tagId, "tagId is required");
        assert(name, "name is required");
        let data = await updateTag( tagId, {name});
        if(data && data._id) {
            let tags = await getAll({});
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
        next(e);
    }
}

Tags.deleteTag = async (req, res, next) => {
    try {
        const { tagId } = req.query;
        assert( tagId, "Id is required");

        let data = await deleteTag(tagId);
        if(data && data._id) {
            let tags = await getAll({});
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


module.exports = Tags;