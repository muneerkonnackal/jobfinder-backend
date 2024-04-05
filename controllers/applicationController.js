const applications = require('../Models/applicationSchema');

const profiles = require("../Models/profileSchema");
const jobs = require("../Models/jobSchema");
const admins = require("../Models/adminSchema");
const jwt = require('jsonwebtoken');

const jwtSecretKey = 'jobportalsecretkey123';
// const { ObjectId } = require('mongodb');

//:Application by candidate

exports.apply = async (req, res) => {
  console.log('insideApply Function');
  const { userId, jobId } = req.body;
  console.log('Received application request:', userId, jobId);

  try {
    const alreadyApplied = await applications.findOne({ userId, jobId });

    if (alreadyApplied) {
      console.log('Already applied:', userId, jobId);
      return res.status(409).json({ success: false, message: 'Already Applied' });
    }

    const newApplication = new applications({
      userId,
      jobId,
    });

    await newApplication.save();
    console.log('Application saved successfully:', userId, jobId);

    res.status(201).json({ success: true, message: 'Application submitted successfully', application: newApplication });
  } catch (err) {
    console.error('Error processing job application:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

//:get candidate applied Jobs

exports.getAppliedJobs = async (req, res) => {
    console.log('Inside getAppliedJobs');
  
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log('Received JWT:', token);
  
      const decodedToken = jwt.verify(token, jwtSecretKey);
      console.log('Decoded Token:', decodedToken);
  
      const userId = decodedToken.userId;
      console.log('User Id:', userId);

      
  
      const applicationDocs = await applications.find({ userId });
      console.log('Application Docs:', applicationDocs);
  
      if (applicationDocs.length === 0) {
        console.log('No applications found for the user');
        return res.status(200).json([]);
      }
  
      const appliedJobs = await Promise.all(applicationDocs.map(async (application) => {
        const profileDoc = await profiles.findOne({ userId });
        const jobDoc = await jobs.findById(application.jobId);
  
        return {
          application,
          profile: profileDoc,
          job: jobDoc,
        };
      }));
  
      console.log('Applied Jobs:', appliedJobs);
  
      res.status(200).json(appliedJobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //:delete Applied JobsJobs

 

  exports.deleteApplication = async (req, res) => {
    console.log('Inside delete section');
    const { id } = req.params;
    console.log(id);
  
    try {
      const deleteApplication = await applications.findByIdAndDelete(id);
  
      if (!deleteApplication) {
        return res.status(404).json({ error: 'Application not found' });
      }
  
      res.status(200).json(deleteApplication);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


//:Get applicants of each jobs and and getted by unique admins

exports.getCandidatesApplyForJobByAdmin = async (req, res) => {
  console.log('inside applicants count');
  try {
    console.log(req.params);
    const { adminId } = req.params;
    const { jobId } = req.params;
    console.log(adminId, jobId); // Change here to use req.params

    // Find the job document with the provided jobId and the posting admin's ID
    const job = await jobs.findOne({ _id: jobId, userId: adminId }); // Change here to use AdminId
    console.log(job);

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized access.' });
    }

    // Find applications for the specific job
    const jobApplications = await applications.find({ jobId });

    if (jobApplications.length === 0) {
      return res.status(200).json({ message: 'No candidates applied for this job.' });
    }

    // Extract candidate IDs from applications
    const candidateIds = jobApplications.map((application) => application.userId);

    // Find candidate details for the extracted IDs
    // const candidates = await profiles.find({ _id: { $in: candidateIds } }).populate('profile');
    const candidates = await profiles.find({ userId: { $in: candidateIds } });
    const applicationCount = jobApplications.length;
    const jobTitle = job.position

    res.status(200).json({ candidates, applicationCount ,jobTitle ,jobApplications});
  } catch (error) {
    console.error('Error fetching candidate details for job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


