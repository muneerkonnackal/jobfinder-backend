const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, './uploads/images');
    } else {
      cb(null, './uploads/pdfs');
    }
  },
  filename: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      const imageFilename = `image-${Date.now()}-${file.originalname}`;
      cb(null, imageFilename);
    } else if (file.mimetype.startsWith('application/pdf')) {
      const pdfFilename = `pdf-${Date.now()}-${file.originalname}`;
      cb(null, pdfFilename);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profileImage' ) {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
      ? cb(null, true)
      : cb(null, false);
  } else if (file.fieldname === 'resumepdf') {
    file.mimetype === 'application/msword' || file.mimetype === 'application/pdf'
      ? cb(null, true)
      : cb(null, false);
  } else {
    cb(new Error('Unexpected field'), false);
  }
};

const multerConfig = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: 'resumepdf' },
  { name: 'profileImage' }
  
]);


module.exports = multerConfig 





















// // New storage and filter for admin images
// const adminImageStorage = multer.diskStorage({
//   destination: './uploads/admin', // Adjust path as needed
//   filename: (req, file, cb) => {
//     const adminImageFilename = `image-${Date.now()}-${file.originalname}`;
//     cb(null, adminImageFilename);
//   }
// });

// const adminImageFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only jpg, jpeg, png files accepted"), false);
//   }
// };
// const uploadAdminImage = multer({
//   storage: adminImageStorage,
//   fileFilter: adminImageFilter
// }).single('profile');
// // const uploadAdminImage = multer({ storage: adminImageStorage, fileFilter: adminImageFilter });


// module.exports = multerConfig ;





// const multer = require('multer');



// // Configuration for handling multiple files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.fieldname === 'profileImage' || file.fieldname === 'profile') {
//       // Profile and admin images go to images folder
//       cb(null, './uploads/images');
//     } else {
//       // Other files go to pdfs folder
//       cb(null, './uploads/pdfs');
//     }
//   },
//   filename: function (req, file, cb) {
//     if (file.mimetype.startsWith('image/')) {
//       const imageFilename = `image-${Date.now()}-${file.originalname}`;
//       cb(null, imageFilename);
//     } else if (file.mimetype.startsWith('application/pdf')) {
//       const pdfFilename = `pdf-${Date.now()}-${file.originalname}`;
//       cb(null, pdfFilename);
//     } else {
//       cb(new Error('Invalid file type'));
//     }
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.fieldname === 'profileImage' || file.fieldname === 'profile') {
//     // Allow only image types for profile and admin images
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type for image'), false);
//     }
//   } else if (file.fieldname === 'resumepdf') {
//     const allowedTypes = ['application/msword', 'application/pdf'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type for resume'), false);
//     }
//   } else {
//     cb(new Error('Unexpected field'), false);
//   }
// };

// const multerConfig = multer({
//   storage: storage,
//   fileFilter: fileFilter
// }).fields([
//   { name: 'resumepdf' },
//   { name: 'profileImage' }
// ]);

// // Separate instance for handling single file uploads
// const singleProfileImageUpload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// }).single('profileImage');

// // Add single image configuration for admin image
// const singleAdminImageUpload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// }).single('profile');

// module.exports = {
//   multipleUpload: multerConfig,
//   singleProfileImageUpload: singleProfileImageUpload,
//   singleAdminImageUpload: singleAdminImageUpload
// };
