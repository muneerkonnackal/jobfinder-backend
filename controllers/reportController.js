const complaints = require('../Models/reportSchema')
const profiles = require("../Models/profileSchema");
const jobs = require("../Models/jobSchema");
const admins = require("../Models/adminSchema");
const jwt = require('jsonwebtoken');

const jwtSecretKey = 'jobportalsecretkey123';


//:Add reports to admin 
exports.report = async (req, res) => {
    console.log('inside Reports Function');
    const { userId, jobId,topic,message } = req.body;
    console.log('Received application request:', userId, jobId , topic, message);
  
    try {
      const AlreadyRegComplaint = await complaints.findOne({ userId, jobId });
  
      if (AlreadyRegComplaint) {
        console.log('Already complaint registered:', userId, jobId);
        return res.status(409).json({ success: false, message: 'Already Applied' });
      }
  
      const newReports = new complaints({
        userId,
        jobId,
        topic,
        message
      });
  
      await newReports.save();
      console.log('Reports saved successfully:', userId, jobId,topic, message);
  
      res.status(201).json({ success: true, message: 'Report submitted successfully', complaint: newReports });
    } catch (err) {
      console.error('Error processing Report:', err);
    }
  };


  //:get the report from db to superadmin
  exports.getComplaints = async (req, res) => {
    console.log('Inside get Complaints');
  
    try {
      const complaintReports = await complaints.find();
      console.log('Complaints:', complaintReports);
  
      const regComplaints = await Promise.all(complaintReports.map(async (complaint) => {
        const profile = await profiles.findOne({ userId: complaint.userId });
        const jobDoc = await jobs.findById(complaint.jobId);
        const adminProfile = await admins.findOne({ _id: jobDoc.userId });
  
        return {
          complaint,
          profile,
          job: jobDoc,
          admin: adminProfile,
        };
      }));
  
      console.log('Registered Complaints:', regComplaints);
  
      res.status(200).json(regComplaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



//:delete complaints by super admin
exports.deleteCandidateComplaint = async(req,res)=>{
    const {id} = req.params
    try{
        const removeComplaint = await complaints.findByIdAndDelete({_id:id})
        res.status(200).json(removeComplaint)
  
    } catch(err){
        res.status(401).json(err)
    }
  }