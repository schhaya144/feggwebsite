const express = require('express')
const multer = require('multer')
const {
  submitJobApplication,
  getJobApplications,
} = require('../controller/jobApplication')
const path = require('path')

const {
  submitContactForm,
  getContactFormInfo,
  deleteContactForm,
  updateContactForm,
} = require('../controller/ContectFormController')

const router = express.Router()

const {
  createEbook,
  getAllEbooks,
  getEbooksByClass,
  updateEbook,
  deleteEbook,
  toggleEbookStatus,
} = require('../controller/ebookController')

// --------------PreviousPaper

const {
  createPreviousPaper,
  getAllPreviousPaper,
  getPreviousPaperByClass,
  updatePreviousPaper,
  togglePreviousPaperStatus,
  deletePreviousPaper,
} = require('../controller/PreviousYearController')
// ==========================Route video

const videoController = require('../controller/VideoController')

// -=====================-blueprintController
const blueprintController = require('../controller/blueprintController')

//========================route 10th and 12th Model

const {
  storeUserDownload,
  getAllDownloads,
} = require('../controller/Model10and12user')

// ========================Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
})

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp', // Added WebP support
      'video/mp4',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          'Only .jpeg, .png, .webp, .mp4, .pdf, .doc, and .docx files are allowed!'
        ),
        false
      )
    }
  },
})

// POST route for submitting job applications
router.post('/applications', upload.single('resumeFile'), submitJobApplication)
router.get('/getjobapplications', getJobApplications)

// Job
const {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} = require('../controller/JobController')
const {
  createPortfolio,
  getAllPortfolios,
  deletePortfolio,
  getAllPortfoliosDetails,
  updateAllPortfoliosDetails,
} = require('../controller/portfolioController')
const {
  uploadCarouselImage,
  getAllCarouselImages,
  deleteCarouselImage,
} = require('../controller/carouselController')
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controller/announcementController')
const {
  registerStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getTotalStudents,
  validateStudentRegistration,
} = require('../controller/studentController')
const {
  createMockTest,
  getMockTests,
  mockTestDelete,
  getStartMockTest,
  getMockTestById,
} = require('../controller/mocktest/mocktestController')
const {
  submitMockTest,
  getResult,
  getALLResult,
} = require('../controller/mocktest/resultController')
const {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} = require('../controller/mocktest/subjectController')
const {
  getQuestionsBySubject,
  updateQuestion,
  deleteQuestion,
  createQuestion,
} = require('../controller/mocktest/questionsController')
const {
  createSubjects,
  getSubjectss,
  getSubjectsByClass,
  deleteSubjects,
  updateSubjects,
} = require('../controller/practiceseset/subject')
const {
  createChapter,
  getChaptersByid,
  getChapters,
  updateChapter,
  deleteChapter,
} = require('../controller/practiceseset/chapter')
const {
  createQuestions,
  updateQuestions,
  deleteQuestions,
  getAllQuestions,
} = require('../controller/practiceseset/questions')
const {
  createPracticeSet,
  getAllMockSets,
  deleteMockSet,
  startPracticeSet,
} = require('../controller/practiceseset/practiceMock')
const {
  submitTest,
  getTestResults,
  getTestResultsController,
  updateTestResultsController,
  deleteTestResultsController,
} = require('../controller/practiceseset/practiceResult')

//======================== forgetpassword
const {
  getlogin,
  login,
  register,
  requestPasswordReset,
  resetPassword,
} = require('../controller/ForgetPassword')

//===================== Lerner Id
const {
  getStudentByDetails,
  getStudentLernerById,
  updateStudentLernerid,
} = require('../controller/LernerIDController')

//=====================session

const {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
} = require('../controller/SessionController')

//===================== Practice Modal

const {
  getPracticeTests,
  submitPracticeTest,
} = require('../controller/practiceseset/PracticeModelController')
const {
  getTestimonials,
  addTestimonial,
  deleteTestimonial,
} = require('../controller/testimonialController')
const {
  getResultAdmitcardurl,
  uploadResultAdmitUrls,
  updateResultAdmitUrls,
} = require('../controller/resultAdmitcardController')

// const {
//   createPracticeSet,
//   getAllMockSets,
//   deleteMockSet,
// } = require('../controller/practiceseset/practiceMock')

// ========================================== News Letter
const {
  uploadNewsLetter,
  getNewsLetterImages,
  deleteNewsLetterImage,
} = require('../controller/NewsLettercontroller')

// Contact us
router.post('/contact', submitContactForm)
router.get('/get-contact', getContactFormInfo)
router.delete('/delete-contact/:id', deleteContactForm)
router.put('/update-contact/:id', updateContactForm)

// Portfolio
router.post('/portfolio', upload.array('media', 10), createPortfolio)
router.get('/portfolio', getAllPortfolios)
router.get('/portfolio/:id', getAllPortfoliosDetails)
router.delete('/portfolio/:id', deletePortfolio)
router.put('/portfolio/:id', updateAllPortfoliosDetails)

// Jobs
router.get('/getJobs', getJobs)
router.post('/addJob', addJob)
router.put('/updateJob/:id', updateJob)
router.delete('/deleteJob/:id', deleteJob)

// caroussel
router.post('/carousel-img', upload.single('image'), uploadCarouselImage)
router.get('/carousel-img', getAllCarouselImages)
router.delete('/carousel-img/:id', deleteCarouselImage)

// announcement

router.post(
  '/announcements',
  upload.fields([{ name: 'image' }, { name: 'pdf' }]),
  createAnnouncement
)
router.get('/announcements', getAllAnnouncements)
router.get('/announcements/:id', getAnnouncementById)
router.put(
  '/announcements/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  updateAnnouncement
)
router.delete('/announcements/:id', deleteAnnouncement)

// -------------E-material
router.post('/eupload', upload.single('file'), createEbook)
router.get('/ebooks', getAllEbooks)
router.put('/ebooks/:id', updateEbook)
router.delete('/ebooks/:id', deleteEbook)
router.put('/Ebookstatus/:id', toggleEbookStatus)

//----------all Route uploaded videos

router.get('/getuploadvideo', videoController.getVideos)

router.post('/uploadvideo', videoController.uploadVideo)

router.put('/Ovideoupdate/:id', videoController.updateVideo)

router.delete('/Ovideodelete/:id', videoController.deleteVideo)

router.put('/VideoStatus/:id', videoController.toggleVideoStatus)

//---------------- User modal 10th and 12th
router.post('/storeUserDownload', storeUserDownload)
router.get('/getAllDownloads', getAllDownloads)

// ------------- Paper
router.post(
  '/PreviousPaperpost',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'answerKey', maxCount: 1 },
  ]),
  createPreviousPaper
)
router.get('/PreviousPaperget', getAllPreviousPaper)
router.put('/PreviousPaperupdate/:id', updatePreviousPaper)
router.delete('/PreviousPaper/:id', deletePreviousPaper)
router.put('/previouspaperstatus/:id', togglePreviousPaperStatus)

// student register
router.post('/register', validateStudentRegistration, registerStudent)
router.get('/register', getAllStudents)
router.put('/register/:id', updateStudent)
router.delete('/register/:id', deleteStudent)
router.get('/totalStudents', getTotalStudents)

// mock test
// mocktest
router.post('/mock-test', upload.single('MockLogo'), createMockTest)
router.get('/mock-tests', getMockTests)
router.post('/mock-test/submit', submitMockTest)
router.delete('/mock-tests/:id', mockTestDelete)
router.get('/mock-test/:mockTestId', getStartMockTest)
router.get('/result/:resultId', getResult)
router.get('/result', getALLResult)
router.get('/subjects', getSubjects)
router.post('/subjects', createSubject)
router.put('/subjects/:id', updateSubject)
router.delete('/subjects/:id', deleteSubject)
router.post('/questions', createQuestion)
router.get('/questions', getQuestionsBySubject)
router.put('/questions/:questionId', updateQuestion)
router.delete('/questions/:id', deleteQuestion)
router.get('/mockTests/:id', getMockTestById)

// practice set
router.post('/create-subject', createSubjects)
router.get('/get-subjects', getSubjectss)
router.delete('/delete-subjects/:id', deleteSubjects)
router.put('/put-subjects/:id', updateSubjects)
router.get('/get-subjects/:className', getSubjectsByClass)
router.post('/create-chapter', createChapter)
router.get('/chapter', getChapters)
router.put('/chapter/:id', updateChapter)
router.delete('/chapter/:id', deleteChapter)
router.get('/get-chapters/:subjectId', getChaptersByid)
router.post('/create-questions', createQuestions)
router.get('/question', getAllQuestions)
router.put('/question/:id', updateQuestions)
router.delete('/question/:id', deleteQuestions)
router.post('/generate-mock-set', createPracticeSet)

router.get('/practiceset', getAllMockSets)
router.delete('/practiceset/:id', deleteMockSet)
router.get('/start-test/:mockSetId', startPracticeSet)
router.post('/submit-test', submitTest)
router.get('/test-result/:resultId', getTestResults)
router.get('/practiceset', getAllMockSets)
router.delete('/practiceset/:id', deleteMockSet)
router.get('/test-result', getTestResultsController)
router.put('/test-result/:id', updateTestResultsController)
router.put('/test-result/:id', deleteTestResultsController)

//============================
// Routes
router.post(
  '/uploadBlueprint',
  upload.single('file'),
  blueprintController.uploadBlueprint
) // Create (Upload PDF)
router.get('/getuploadBlueprint', blueprintController.getAllBlueprints) // Read (Get all PDFs)
router.get('/getuploadBlueprint/:id', blueprintController.getBlueprintById) // Read (Get a single PDF)
router.put('/uploadBlueprintupdate/:id', blueprintController.updateBlueprint) // Update (Title only)
router.delete('/uploadBlueprintdelete/:id', blueprintController.deleteBlueprint)

// =================== Practice set modal =================

router.get('/getpracticeModal', getPracticeTests)
router.post('/submitpracticeModal', submitPracticeTest)

// testimonial
router.get('/testimonial', getTestimonials) // Fetch all testimonials
router.post('/testimonial', upload.single('image'), addTestimonial) // Add a new testimonial
router.delete('/testimonial/:id', deleteTestimonial)
//========================== reset-password ============
router.post('/login', login)

router.get('/getlogin', getlogin)
router.post('/registerlogin', register)
router.post('/requestpasswordreset', requestPasswordReset)
router.post('/reset-password', resetPassword)

//======================= find LernerID
router.post('/getStudentLernerID', getStudentByDetails)
router.get('/getStudentsLernerID/:id', getStudentLernerById)
router.put('/updateStudentLERnerID/:id', updateStudentLernerid)

// upload result and admit card url
router.post('/upload-url', uploadResultAdmitUrls)
router.put('/upload-url/:id', updateResultAdmitUrls)
router.get('/upload-url', getResultAdmitcardurl)

//============================== news letter

router.post('/NLuploads', upload.single('image'), uploadNewsLetter) // Upload an image
router.get('/getNewsLetterImages', getNewsLetterImages) // Fetch all images
router.delete('/NLuploadsdelete/:id', deleteNewsLetterImage)

// ================= Session
router.post('/uploadsession', updateSession)
router.get('/getsession', getSessions)
router.put('/uploadsession/:id', updateSession) // Update session
router.delete('/uploadsession/:id', deleteSession) // Delete session
module.exports = router
