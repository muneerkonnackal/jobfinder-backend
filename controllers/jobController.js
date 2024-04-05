const jobs = require("../Models/jobSchema");

///:Add jobs
exports.addjobs = async (req, res) => {
    console.log('inside addjob request');
    const userId = req.payload; 
    console.log(userId);

    const companylogo = req.file.filename; 
    const { company, position,qualification,lastdate, typeofworker, expsalary, location, worktype } = req.body;
    console.log(`${company},${position},${typeofworker},${qualification},${lastdate},${expsalary},${location},${worktype},${companylogo}`);

    try {
               const newJob = new jobs({
                company,
                position,
                qualification,
                lastdate,
                typeofworker,
                expsalary,
                location,
                worktype,
                companylogo,
                userId
            });
            await newJob.save();
            res.status(200).json(newJob);
        
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
};


//:get home jobs
exports.getHomeJobs = async(req,res)=>{
    

    try{
        // const homeJobs = await jobs.find().limit(4)
        const homeJobs = await jobs.find().sort({ createdAt: -1 }).limit(4);
        res.status(200).json(homeJobs)

    } catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//:get all jobs

exports.getAllJobs = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);
    let query = {};

  // Handle different search keys with case-insensitive regex
  if (searchKey) {
    query = {
      $or: [
        { position: { $regex: new RegExp(searchKey, 'i') } },
        { qualification: { $regex: new RegExp(searchKey, 'i') } },
        { worktype: { $regex: new RegExp(searchKey, 'i') } },
        { typeofworker: { $regex: new RegExp(searchKey, 'i') } },
        { location: { $regex: new RegExp(searchKey, 'i') } },
      ],
    };
  }

  try {
    const allJobs = await jobs.find(query);
    res.status(200).json(allJobs);
  } catch (err) {
    res.status(401).json(`Request failed due to ${err}`);
  }
};

//:getadminjobs
exports.getAdminJobs = async(req,res)=>{
  userId = req.payload
  console.log(userId);
  try{
      const allAdminJobs = await jobs.find({userId})
      res.status(200).json(allAdminJobs)

  } catch(err){
      res.status(401).json(`Request failed due to ${err}`)
  }

}


// //:editadminjobs

exports.editAdminJobs = async (req, res) => {
  console.log('Inside edit jobs');
  const { id } = req.params;
  const userId = req.payload;
  const { company, position, qualification, lastdate, typeofworker, expsalary, location, worktype, companylogo } = req.body;
  const uploadCompanyLogo = req.file ? req.file.filename : companylogo;

  try {
    const updateJob = await jobs.findByIdAndUpdate(
      { _id: id },
      {
        company,
        position,
        qualification,
        lastdate,
        typeofworker,
        expsalary,
        location,
        worktype,
        companylogo: uploadCompanyLogo,
        userId
      },
      { new: true }
    );

    res.status(200).json(updateJob);
  } catch (err) {
    res.status(401).json(err);
  }
};

//:delete Jobs
exports.deleteAdminJobs = async(req,res)=>{
  console.log("inside delete section");
  const {id} = req.params
  try{
      const removeJob = await jobs.findByIdAndDelete({_id:id})
      res.status(200).json(removeJob)

  } catch(err){
      res.status(401).json(err)
  }
}




  // Handle different search keys
//   if (searchKey === 'developer') {
//     query = {
//       position: {
//         $regex: searchKey,
//         $options: 'i'
//       }
//     };
//   } else if (searchKey === 'ui/ux') {
//     query = {
//       position: {
//         $regex: 'UI/UX',
//         $options: 'i'
//       }
//     };
//   }
//   else if (searchKey === 'B.Tech') {
//     query = {
//       qualification: {
//         $regex: 'B.Tech',
//         $options: 'i'
//       }
//     };
//   }else if (searchKey === 'wfh' || searchKey === 'Intern') {
//     query = {
//       worktype: {
//         $regex: searchKey,
//         $options: 'i'
//       }
//     };
//   }   else if (searchKey === 'Fresherobs') {
//     query = {
//       typeofworker: {
//         $regex: 'Fresher',
//         $options: 'i'
//       }
//     };
//   } else if (searchKey === 'Bangalore' || searchKey === 'Chennai' || searchKey === 'Kochi') {
//     query = {
//       location: {
//         $regex: searchKey,
//         $options: 'i'
//       }
//     };
//   }

//     try{
//         const allJobs = await jobs.find(query)
//         res.status(200).json(allJobs)

//     } catch(err){
//         res.status(401).json(`Request failed due to ${err}`)
//     }
//
 //}
