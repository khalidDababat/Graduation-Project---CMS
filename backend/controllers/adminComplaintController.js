const path = require('path');
const fs = require('fs');
const moment = require('moment');
const complaintModel = require('../models/complaintModel');
const departmentModel = require('../models/departmentModel');
const employeeModel = require('../models/employeeModel');





exports.getFilteredComplaints = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start date and end date are required.' });
  }
    const complaints = await complaintModel.getComplaintsByDate(startDate, endDate);
    res.status(200).json({ complaints });
  }
catch(err){
  res.status(500).json({ message: 'Error filtering complaints', error: err.message });
}  
};

exports.filteredComplaints = async(req,res) => {
  try{
      const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required.' });
    }
    const complaints = await complaintModel.filterComplaints(startDate, endDate);
    res.status(200).json({ complaints });

  }
  catch(err){
    res.status(500).json({ message: 'Error filtering complaints', error: err.message });
  }
}

exports.getDropdownData = async (req, res) => {
  try {
    const departments = await departmentModel.getAllDepartments();
    const employees = await employeeModel.getAllEmployees();
    res.status(200).json({ departments, employees });
  } catch (err) {
    res.status(500).json({ message: 'Error loading dropdown data', error: err.message });
  }
};


// view image complaint
exports.viewComplaintImage = async (req, res) => {
  try {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, '../uploads/complaints/images', imageName);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.sendFile(imagePath);
  } catch (err) {
    res.status(500).json({ message: 'Error displaying image', error: err.message });
  }
};
// download image complaint
exports.downloadComplaintImage = async (req, res) => {
  try {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, '../uploads/complaints/images', imageName);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.download(imagePath);
    res.status(200).json({ message: 'download successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error downloading image', error: err.message });
  }
};

// view  detail for one complaint
exports.getComplaintDetails = async (req, res) => {
  const complaintId = req.params.id;

  try {
      const complaints = await complaintModel.getComplaintDetails(complaintId);

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getComplaintsInfo = async (req, res) => {
  try {
    const complaints = await complaintModel.getComplaintsInfo();
    
    res.status(200).json({ complaints});
  } catch (err) {
    res.status(500).json({ message: 'Error loading dropdown data', error: err.message });
  }
};

//delete complaint by is_deleted_by_admin
exports.deleteComplaintbyadmin = async (req, res) => {

  const complaintId = req.params.id;


  try {
    
    await complaintModel.deletedComplaint(complaintId);
    res.status(200).json({ message: 'Complaint deleted by admin.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateStatusWithNote = async (req,res) => {
  const {complaintId,status,note} = req.body;
  
  // console.log('Updating complaint:', complaintId, 'to status:', status, "Note: ",note);

  try{
    const updatecomplaintstatus = await complaintModel.updateStatusWithNote(complaintId,status,note);
    res.status(200).json({message: 'Complaint status and note updated successfully.'});
    
  }
  catch(err){
    res.status(500).json({message: 'Server error',error: err.message});

  }
}

exports.updateStatus = async (req,res) => {
  const {complaintId,status} = req.body;
  
  // console.log('Updating complaint:', complaintId, 'to status:', status);

  try{
    const updatecomplaintstatus = await complaintModel.updateStatus(complaintId,status);
    res.status(200).json({message: 'Complaint status  updated successfully.'});
    
  }
  catch(err){
    res.status(500).json({message: 'Server error',error: err.message});

  }
}



exports.getComplaintByStatus = async (req,res) => {

        const {status} = req.query;
        // console.log('status:', status);
        try{
        const [results] = await complaintModel.getComplaintsByStatus(status);
        res.status(200).json(results);

        }
        catch(err){
            res.status(500).json({message: 'Server error',error: err.message}); 
  
        }

}

exports.countComplaintByStatus = async (req,res) => {

        const {status} = req.query;
        // console.log('status:', status);
        try{
        const [results] = await complaintModel.getCountComplaintsByStatus(status);
        res.status(200).json(results);

        }
        catch(err){
            res.status(500).json({message: 'Server error',error: err.message}); 
  
        }

}
exports.countComplaints = async (req,res) => {

        
        try{
        const [results] = await complaintModel.getCountComplaints();
        res.status(200).json(results);

        }
        catch(err){
            res.status(500).json({message: 'Server error',error: err.message}); 
  
        }

}

exports.assignComplaint = async (req, res) => {
  const { complaint_id, employee_id, admin_id, note } = req.body;

  try {
    await complaintModel.assignComplaint({ complaint_id, employee_id, admin_id, note });
    res.status(200).json({ message: 'Complaint assigned successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.returnComplaint = async (req, res) => {
  const { complaint_id, employee_id, admin_id,note } = req.body;

  //  console.log('Received data:', req.body);

  if (!complaint_id || !employee_id) {
    return res.status(400).json({ message: "complaint_id and employee_id are required" });
  }

  try {
    await complaintModel.returnComplaint({ complaint_id, employee_id,admin_id, note });
    res.status(200).json({ message: 'Complaint returned successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAssignedComplaints = async (req, res) => {
  const { employee_id } = req.params;

  try {
    // getAssignedComplaints
    const complaints = await complaintModel.getAssignedComplaints(employee_id);
    res.status(200).json({ complaints });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.AssignedComplaintsByEmployee = async (req, res) => {
  const { employee_id } = req.params;

  try {
    // getAssignedComplaints
    const complaints = await complaintModel.getAssignedComplaintsByEmployee(employee_id);
    res.status(200).json({ complaints });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getIncoming = async (req, res) => {
  const { type, user_id } = req.query;

  try {
    const [result] = await complaintModel.getIncomingComplaints(type, user_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOutgoing = async (req, res) => {
  const { type, user_id } = req.query;

  try {
    const [result] = await complaintModel.getOutgoingComplaints(type, user_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};




