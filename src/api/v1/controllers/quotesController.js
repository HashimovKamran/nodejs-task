const axios = require("axios");
const catchAsyncError = require('../helpers/catchAsyncErrors');

const options = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=movies',
    headers: {
        'X-Api-Key': process.env.X_Api_Key
    },
    params: { limit: 1 }
}

const listQuotes = catchAsyncError(async (req, res, next) => {
    const { limit } = req.body.metadata;
    options.params.limit = limit;

    axios.request(options).then((response) => {
        res.json({"data":response.data});
    });
});

module.exports = listQuotes;