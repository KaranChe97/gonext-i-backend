const { create, getAll, remove, modify, createMany } = require('../../model/units');


const Unit = {};


Unit.createMany = async (req, res, next) => {
    try {
        const { unitArray } = req.body;
        if (unitArray instanceof Array && unitArray.length) {
            let createData = [];
            for(const i in unitArray) {
                createData.push({name: unitArray[i]})
            }
            const data = await createMany(createData);
            res.status(200).json({
                status: 1,
                message: "Units created successfully"
            })
        } else {
            res.status(200).json({
                status : 2,
                message : "Provide valid array",
            });
        }
    } catch (e) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}

Unit.getAll = async (req, res, next) => {
    try {
        const data = await getAll();
        console.log(data);
        if(data && data.length) {
            const units = data.map(d => d.name);
            res.status(200).json({
                status: 1,
                message: "success",
                units
            })
        }
        
    } catch (e) {
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}



module.exports = Unit;