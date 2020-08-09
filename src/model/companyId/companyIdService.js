const companyIdModel = require('./companyIdModel');

const companyIdService = {};

companyIdService.createCompanyId = () =>  companyIdModel.create({ _id: 'dc', sequence:1});

companyIdService.findAndIncrement = (companyId) => companyIdModel.findOneAndUpdate(
        {_id: companyId },
        {$inc:{sequence:1}},
        { new:true }
    )

companyIdService.isCollectionExist = (companyId) => companyIdModel.findById({ _id: companyId });

module.exports = companyIdService;