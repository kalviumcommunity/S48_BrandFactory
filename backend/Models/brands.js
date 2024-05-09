const mongoose = require("mongoose");
const Joi = require('joi');

const FactorySchema = new mongoose.Schema({
    BrandName: String,
    Description: String,
    History: String,
    Founders: Array,
    MissionStatement: String,
    SellingPoint: Array,
    QualityStandards: Array,
    WebLink: String,
    created_by: String
});

const factoryValidationSchema = Joi.object({
    BrandName: Joi.string().required(),
    Description: Joi.string().required(),
    History: Joi.string().required(),
    Founders: Joi.string().required(),
    MissionStatement: Joi.string().required(),
    SellingPoint: Joi.string().required(),
    QualityStandards: Joi.string().required(),
    WebLink: Joi.string().required(),
    created_by: Joi.string().required()
});

const factoryModel = mongoose.model("brands", FactorySchema);
module.exports = {factoryModel,factoryValidationSchema};