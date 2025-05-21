const userModel = require('../models/userModel');
const complaintModel = require('../models/complaintModel');

exports.submitComplaint = async (userData, complaintData) => {
        try {

    const result = await userModel.createUser(userData);
    const user_id = result.insertId;

    
    const complaintResult = await complaintModel.createComplaint({
    ...complaintData,
    user_id
    });

    return complaintResult;
    } catch (err) {
        throw new Error('Error submitting complaint: ' + err.message);
    }
};
