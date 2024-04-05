//*import model - profileSchema
const profiles = require("../Models/profileSchema");

//*function to add profile
exports.addProfile = async (req, res) => {
  console.log("inside addprofile request"); 
  //: ivide user id ne edukkanam jwtmiddleware nu send cheytha userid req.payload Lil ayachath

  const userId = req.payload;
  console.log(userId);
  //:ivide nerit destructure cheyth edukkan pattilla karanam form data ayit anu send cheythath (append)
  //:so we use multer to destructure formdata

  //*destructuring the or access the original name by req.files its an array of fields.
  const resumepdf = req.files.resumepdf[0].filename;
  // console.log(resumepdf);
  const profileImage = req.files.profileImage[0].filename;
  // console.log(profileImage);

  const {
    username,
    email,
    skills,
    profession,
    qualification,
    mobile,
    location,
    linkedin,
    about,
  } = req.body;

  console.log(
    `${username},${email},${skills},${resumepdf},${profileImage},${profession},${qualification},${mobile},${location},${linkedin},${about},${userId}`
  );

  try {
    const skillsArray = skills.split(',').map(skill => skill.trim());
    const existingProfile = await profiles.findOne({ email });
    if (existingProfile) {
      res.status(406).json("Profile already exist.. upload new profile");
    } else {
      const newProfile = new profiles({
        username,
        email,
        skills:skillsArray,
        resumepdf,
        profileImage,
        profession,
        qualification,
        mobile,
        location,
        linkedin,
        about,
        userId
      });

      await newProfile.save();
      res.status(200).json(newProfile);
    }
  } catch (err) {
    res.status(401).json(`request failed due to  ${err}`);
  }
};

//*Get profile data
// Get profile data
exports.getProfile = async (req, res) => {
  console.log('Inside get function');
  
  const userId = req.payload;

  try {
    const profile = await profiles.find({ userId });
    res.status(200).json(profile);
    console.log(profile);
  } catch (err) {
    res.status(401).json(`Request failed due to error: ${err}`);
  }
};



// exports.getProfile = async (req,res)=>{
//   console.log('inside get function');
//   const userId = req.payload
//   console.log(userId);
 
//   try{
//     const profile = await profiles.find({userId})
//     res.status(200).json(profile);
//     console.log(profile);

//   } catch(err){
//     res.status(401).json(`request failed due to error: ${err}`);
//   }
// }

// exports.getProfile = async (req, res) => {
//   const userId = req.payload;

//   try {
//     const profile = await profiles.findOne({ userId });

//     if (!profile) {
//       console.error('Profile not found');
//       return res.status(404).json({ error: 'Profile not found' });
//     }

//     console.log('Profile retrieved:', profile);
//     res.status(200).json(profile);
//   } catch (err) {
//     console.error(`Error fetching profile: ${err}`);
//     res.status(500).json({ error: `Request failed due to error: ${err}` });
//   }
// };



// exports.getProfile = async (req, res) => {
//   console.log('inside get function');
//   const userId = req.payload;

//   try {
//     // Use findOne to get a single profile based on userId
//     const profile = await profiles.findOne({ userId });

//     // Check if a profile is found
//     if (profile) {
//       res.status(200).json(profile);
//       console.log(profile);
//     } else {
//       // Handle the case where no profile is found
//       res.status(404).json({ error: 'Profile not found' });
//       console.log('Profile not found');
//     }

//   } catch (err) {
//     // Handle other errors
//     res.status(401).json({ error: `Request failed due to error: ${err}` });
//   }
// };



exports.editProfile = async (req, res) => {
  console.log('Inside edit function');
  const userId = req.payload;
  console.log(userId);

  const {
    username,
    email,
    skills,
    profession,
    qualification,
    mobile,
    location,
    linkedin,
    about,
  } = req.body;

  // Check if req.files exist
  const uploadPdf = req.files && req.files['resumepdf'] ? req.files['resumepdf'][0].filename : null;
  const uploadProfileImage = req.files && req.files['profileImage'] ? req.files['profileImage'][0].filename : null;

  console.log(uploadPdf);
  console.log(uploadProfileImage);

  try {
    // Find the profile by userId
    const existingProfile = await profiles.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          email,
          skills,
          profession,
          qualification,
          mobile,
          location,
          linkedin,
          about,
          resumepdf: uploadPdf || existingProfile.resumepdf,
          profileImage: uploadProfileImage || existingProfile.profileImage,
        },
      },
      { new: true }
    );

    if (!existingProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Save the updated profile
    const updatedProfile = await existingProfile.save();

    res.status(200).json(updatedProfile);
    console.log(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//:get home profiles
exports.getHomeProfiles = async (req, res) => {
  try {
    const homeProfiles = await profiles.find();

    if (homeProfiles.length === 0) {
      
      return res.status(404).json({ message: 'No profiles found' });
    }

    res.status(200).json(homeProfiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//:getsuperadmin  profiles

exports.getSuperAdminProfiles = async (req, res) => {
  const searchKey = req.query.search || ''; 
  console.log(searchKey);

  const query = {
    username: {
      $regex: searchKey,
      $options: 'i',
    }
  };

  try {
    const allSuperProfiles = await profiles.find(query);
    res.status(200).json(allSuperProfiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Request failed due to ${err.message}` });
  }
};

//:remove user by superadmin
exports.deleteCandidateProfile = async(req,res)=>{
  const {id} = req.params
  try{
      const removeProfile = await profiles.findByIdAndDelete({_id:id})
      res.status(200).json(removeProfile)

  } catch(err){
      res.status(401).json(err)
  }
}

// exports. = async (req, res) => {
//   try {
//     const superProfiles = await profiles.find();

//     if (superProfiles.length === 0) {
//       // If no profiles are found
//       return res.status(404).json({ message: 'No profiles found' });
//     }

//     res.status(200).json(superProfiles);
//     console.log("superpro", superProfiles);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };




// exports.editProfile = async (req, res) => {
//   console.log('inside edit function');
//   const userId = req.payload;
//   console.log(userId);
//   const { username, email, skills, resumepdf, profileImage, profession, qualification, mobile, location, linkedin, about } = req.body;

//   // Check if req.files exist and use their properties
//   const uploadPdf = req.files && req.files.resumepdf ? req.files.resumepdf[0].filename : resumepdf;
//   const uploadProfileImage = req.files && req.files.profileImage ? req.files.profileImage[0].filename : profileImage;
//   console.log(uploadPdf);
//   console.log(uploadProfileImage);
//   try {
//     const updateProfile = await profiles.findByIdAndUpdate(
//       { _id: userId },
//       {
//         username,
//         email,
//         skills,
//         resumepdf: uploadPdf,
//         profileImage: uploadProfileImage,
//         profession,
//         qualification,
//         mobile,
//         location,
//         linkedin,
//         about
//       },
//       { new:true }
//     );
//     console.log(updateProfile);
//     await updateProfile.save()

//     res.status(200).json(updateProfile);
//     console.log(updateProfile);
//   } catch (err) {
//     res.status(401).json(err);
//   }
// };