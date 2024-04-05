//:Paths to resolve the client requests

//:1] import express
const express = require('express')
// const path = require('path')

//: Import controller
const userController = require('../controllers/userController')

//: Import profile controller
const profileController = require('../controllers/profileController')

//:import jwt middleware
const jwtMiddleware = require('../middleware/jwtMiddleware')

//:import multer middleware
const multerConfig = require('../middleware/multerMiddleware')
const multerConfig2 = require('../middleware/multer2')
//: Import singleAdminImageUpload from multerMiddleware
// const { singleAdminImageUpload } = require('../middleware/multerMiddleware');

//:import admin controller
const adminController = require('../controllers/adminController')

//:import job controller
const jobController = require('../controllers/jobController')

//:import application Controller
const applicationController = require('../controllers/applicationController')

//:import report controller
const reportController = require('../controllers/reportController')

//:import offer Controller
const offerController = require('../controllers/offerController')


//:import razorpay controller
const razorpayController = require('../controllers/razorpayController')


//:2] create an object for the class router in express
const router = new express.Router()

//:3] Path for resolving the request
//: Syntax - router.httprequest('path to resolve the request',()=>{how to resolve the request (inside controller file)})  callback le how to resolve the request patranj kodukkandath controller il aanu as logic
//:a] register
router.post('/user/register',userController.register)

//:b] login
router.post('/user/login',userController.login)

//:c] addprofile 
router.post('/profile/add', jwtMiddleware,multerConfig, profileController.addProfile);

//:d] get candidate data

router.get('/profile/candidateProfile', jwtMiddleware, profileController.getProfile);

//:e] edit profile
router.put('/profile/edit',jwtMiddleware,multerConfig,profileController.editProfile)

//:f] admin register
router.post('/admin/register',adminController.register)

//:g] Admin login
router.post('/admin/login',adminController.login)

//:h] admit edit profile

// router.put('/admin/edit',multerConfig.uploadAdminImage,adminController.editAdmin);

//  router.put('/admin/edit',jwtMiddleware, uploadAdminImage,adminController.editAdmin)
  router.put('/admin/edit',jwtMiddleware, multerConfig2.single('profile'),adminController.editAdmin)
// router.put('/admin/edit', jwtMiddleware, singleAdminImageUpload, adminController.editAdmin);

//:i] addjobs
router.post('/job/add', jwtMiddleware,multerConfig2.single('companylogo'), jobController.addjobs);

//:j] Get home jobs
 router.get('/job/home-job',jobController.getHomeJobs)   

 //:k] getAllJobs
  router.get('/job/all-job',jwtMiddleware,jobController.getAllJobs)
 
  //:l]  get Admin Jobs
  router.get('/admin/admin-jobs',jwtMiddleware,jobController.getAdminJobs) 

  //:m] Edit Admin Jobs
  router.put('/job/edit/:id',jwtMiddleware,multerConfig2.single('companylogo'),jobController.editAdminJobs)

  //:l] Delete Admin Jobs
  router.delete('/job/remove/:id',jwtMiddleware,jobController.deleteAdminJobs)

  //:m] get home profiles
 router.get('/profile/home-profile',profileController.getHomeProfiles)   

  //:add Applications
  router.post('/application/add',jwtMiddleware,applicationController.apply)

  //:Get candidates applications
  router.get('/application/candidate-applications', jwtMiddleware, applicationController.getAppliedJobs);

  //:l] Delete applications  of candidate
  router.delete('/application/remove/:id',applicationController.deleteApplication)


 //:Get applicants for admins
 router.get('/application/applicants/:adminId/:jobId', jwtMiddleware, applicationController.getCandidatesApplyForJobByAdmin);


  //:m] get super profiles
  router.get('/profile/super-profile',jwtMiddleware,profileController.getSuperAdminProfiles)  


  //:remove profile by superadmin 
    router.delete('/profile/remove/:id',jwtMiddleware,profileController.deleteCandidateProfile)

    //:m] get super profiles
  router.get('/admin/super-admin',jwtMiddleware,adminController.getSuperRecruiters)  

//:remove profile by superadmin 
router.delete('/admin/remove/:id',jwtMiddleware,adminController.deleteRecruiterProfile)

//:add reports
router.post('/report/add',jwtMiddleware,reportController.report)

//:fetch complaints by super admin
router.get('/report/candidate-report',reportController.getComplaints)

//: delete complaints by  super admin
router.delete('/report/report-remove/:id',jwtMiddleware,reportController.deleteCandidateComplaint)

//:add Offers
router.post('/offer/add', jwtMiddleware,multerConfig2.single('offerImage'), offerController.addOffers);

//:update offer
router.put('/offer/edit',jwtMiddleware,multerConfig2.single('offerImage'),offerController.editAdminOffers)

//:get offers by candidates
router.get('/offer/candidate-offer',offerController.getOffer)

//:get offers by candidates
router.get('/offer/get-offer',offerController.getAdminOffer)

//:get checkouts of razorpay payments
router.post('/payment/checkout',razorpayController.checkout)


//:get checkouts of razorpay payments verification
router.post('/payment/payment-verification',razorpayController.checkoutVerification)

//:get all payment transactions
router.get('/payment/payment-report',razorpayController.getTransactions)



//:4] Export the router

module.exports = router;