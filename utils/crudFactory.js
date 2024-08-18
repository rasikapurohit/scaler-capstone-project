
// to get products/user data , simple, getDataModel

// this function accepts a parameter and returns a function
const getAllFactory = (elementModel) => async (req, res) => {
    try {
        
        const data  = await elementModel.find();
        //controller will respond with their respective status codes and model
        
        if(data.length === 0){
            res.status(404).json({
                status: 404,
                message: "No data found"
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Data found",
                data: data
            });
        }
        
        
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
        
    }
}

const createElementFactory = (elementModel) => async (req, res) => {
    try {
        // console.log(req.body)
        const elementDetails = req.body;
        console.log(elementDetails)
        // console.log(elementModel)
        const element = await elementModel.create(elementDetails);
        if(element == undefined){
            res.status(400).json({
                status: 400,
                message: "Bad request"
            });
        } else {
            res.status(201).json({
                status: 201,
                message: "Data created",
                data: element
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
        
    }
}

const getElementByIdFactory = (elementModel) => async (req, res) => {
    try {
        const elementId = req.params.id;
        const element = await elementModel.findById(elementId);
        if (!element || element == undefined) {
            res.status(404).json({
                status: 404,
                message: "No data found"
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Data found",
                data: element
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}


const checkInput = function (req, res, next) {
    console.log("req method => ", req.method);
    
    const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length === 0;
    if (isEmpty) {
        res.status(400).json({
            status: 400,
            message: "Body cannnot be empty"
        });
    } else {
        next();
    }
}

const deleteElementByIdFactory = (elementModel) => async (req, res) => {
    try {
        const elementId = req.params.id;
        const element = await elementModel.findByIdAndDelete(elementId);
        if (!element || element == undefined) {
            res.status(404).json({
                status: 404,
                message: "No data found"
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Data deleted",
                data: element
            });
        }
        
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
        
    }
}

const updateElementByIdFactory = (elementModel) => async (req, res) => {
    try {
        const elementId = req.params.id;
        const elementDetails = req.body;
        const element = await elementModel.findByIdAndUpdate(elementId, elementDetails, {new: true});
        if (!element || element == undefined) {
            res.status(404).json({
                status: 404,
                message: "No data found"
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Data updated",
                data: element
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
        
    }
}

module.exports = {
    getAllFactory,
    createElementFactory,
    getElementByIdFactory,
    checkInput,
    deleteElementByIdFactory,
    updateElementByIdFactory
}