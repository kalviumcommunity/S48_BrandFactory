const mongoose = require("mongoose");

const FactorySchema = new mongoose.Schema({
    BrandName: String,
    Description: String,
    History: String,
    Founders: Array,
    MissionStatement: String,
    SellingPoint: Array,
    QualityStandards: Array,
    WebLink: String,
});

const FactoryModel = mongoose.model("brands", FactorySchema);
module.exports = FactoryModel;