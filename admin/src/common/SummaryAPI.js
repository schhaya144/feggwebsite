// const backendDomain = 'https://feggbackend.onrender.com'
const backendDomain = 'http://localhost:8006'

const SummaryApi = {
  addEvent: {
    url: `${backendDomain}/api/events`,
    method: 'post',
  },
  getEvent: {
    url: `${backendDomain}/api/events`,
    method: 'get',
  },
  updateEvent: {
    url: `${backendDomain}/api/events/:id`,
    method: 'put',
  },
  deleteEvent: {
    url: `${backendDomain}/api/events/:id`,
    method: 'delete',
  },
  evenetCount: {
    url: `${backendDomain}/api/events`,
    method: 'get',
  },

  // For Courses
  addCourse: {
    url: `${backendDomain}/api/addCourse`,
    method: 'post',
  },
  getCourses: {
    url: `${backendDomain}/api/getCourses`,
    method: 'get',
  },
  updateCourse: {
    url: `${backendDomain}/api/updateCourse/:id`,
    method: 'put',
  },
  deleteCourse: {
    url: `${backendDomain}/api/deleteCourse/:id`,
    method: 'delete',
  },
  CourseCount: {
    url: `${backendDomain}/api/events`,
    method: 'get',
  },

  // Admin routes
  loginAdmin: {
    url: `${backendDomain}/api/loginAdmin`,
    method: 'post',
  },
  loginPost: {
    url: `${backendDomain}/api/login`,
    method: 'post',
  },
  requestPasswordReset: {
    url: `${backendDomain}/api/request-password-reset`,
    method: 'post',
  },
  // mock test
  subjects: {
    url: `${backendDomain}/api/subjects`,
    method: 'get',
  },
  postQuestion: {
    url: `${backendDomain}/api/questions`,
    method: 'post',
  },
  DeleteQuestion: {
    url: `${backendDomain}/api/questions/:questionId`,
    method: 'delete',
  },
  updateQuestion: {
    url: `${backendDomain}/api/questions/:questionId`,
    method: 'put',
  },
  Mocktest: {
    url: `${backendDomain}/api/mock-test`,
    method: 'post',
  },
  GetMocktest: {
    url: `${backendDomain}/api/practice-set`,
    method: 'get',
  },

  createSUbject: {
    url: `${backendDomain}/api/create-subject`,
    method: 'post',
  },
  createChapter: {
    url: `${backendDomain}/api/create-chapter`,
    method: 'post',
  },
  GetSubjectByClass: {
    url: `${backendDomain}/api/get-subjects/:className`,
    method: 'get',
  },
  generatePracticeset: {
    url: `${backendDomain}/api/generate-mock-set`,
    method: 'get',
  },
  CreateQuestion: {
    url: `${backendDomain}/api/create-questions`,
    method: 'post',
  },
  GetChapterBySubjectid: {
    url: `${backendDomain}/api/get-chapters/:subjectId`,
    method: 'get',
  },
  DeleteMock: {
    url: `${backendDomain}/api/mock-tests/:mockTestId`,
    method: 'delete',
  },
  deleteSubject: {
    url: `${backendDomain}/api/subjects/:id`,
    method: 'delete',
  },
  updateSubject: {
    url: `${backendDomain}/api/put-subjects/:id`,
    method: 'put',
  },
  Getpracticeset: {
    url: `${backendDomain}/api/practiceset`,
    method: 'get',
  },
  DeletePracticeset: {
    url: `${backendDomain}/api/practiceset/:id`,
    method: 'delete',
  },

  getALLResult: {
    url: `${backendDomain}/api/result`,
    method: 'get',
  },
  getAnnouncements: {
    url: `${backendDomain}/api/announcements`,
    method: 'get',
  },
  DeleteAnnouncements: {
    url: `${backendDomain}/api/announcements/:id`,
    method: 'delete',
  },
  carouselImg: {
    url: `${backendDomain}/api/carousel-img`,
    method: 'get',
  },
  DeleteCarouselImg: {
    url: `${backendDomain}/api/carousel-img/:id`,
    method: 'delete',
  },
  Ebooks: {
    url: `${backendDomain}/api/ebooks?admin=true`,
    method: 'get',
  },
  EbooksId: {
    url: `${backendDomain}/api/ebooks/:id`,
    method: 'get',
  },
  Eupload: {
    url: `${backendDomain}/api/eupload`,
    method: 'post',
  },
  Ebookstatus: {
    url: `${backendDomain}/api/Ebookstatus`,
    method: 'put',
  },
  getAllDownloads: {
    url: `${backendDomain}/api/getAllDownloads`,
    method: 'get',
  },
  getuploadvideo: {
    url: `${backendDomain}/api/getuploadvideo?admin=true`,
    method: 'get',
  },
  Ovideoupdate: {
    url: `${backendDomain}/api/Ovideoupdate/:id`,
    method: 'put',
  },
  VideoStatus: {
    url: `${backendDomain}/api/VideoStatus`,
    method: 'put',
  },
  Uploadvideo: {
    url: `${backendDomain}/api/uploadvideo`,
    method: 'post',
  },
  Ovideodelete: {
    url: `${backendDomain}/api/Ovideodelete`,
    method: 'delete',
  },
  Register: {
    url: `${backendDomain}/api/register`,
    method: 'get',
  },
  deleteRegister: {
    url: `${backendDomain}/api/register/:id`,
    method: 'get',
  },
  PreviousPaperpost: {
    url: `${backendDomain}/api/PreviousPaperpost`,
    method: 'post',
  },
  PreviousPaper: {
    url: `${backendDomain}/api/PreviousPaperget?admin=true`,
    method: 'get',
  },
  previouspaperstatus: {
    url: `${backendDomain}/api/previouspaperstatus`,
    method: 'put',
  },
  PreviousPaperId: {
    url: `${backendDomain}/api/PreviousPaper`,
    method: 'put',
  },
  PreviousPaperupdate: {
    url: `${backendDomain}/api/PreviousPaperupdate`,
    method: 'put',
  },
  Blueprint: {
    url: `${backendDomain}/api/uploadBlueprint`,
    method: 'post',
  },
  Blueprintget: {
    url: `${backendDomain}/api/getuploadBlueprint`,
    method: 'get',
  },
  BlueprintUpdate: {
    url: `${backendDomain}/api/uploadBlueprintupdate`,
    method: 'put',
  },
  Blueprintdelete: {
    url: `${backendDomain}/api/uploadBlueprintdelete`,
    method: 'delete',
  },

  // practice set
  // subject
  getSubjects: {
    url: `${backendDomain}/api/get-subjects`,
    method: 'get',
  },
  DeleteSubjects: {
    url: `${backendDomain}/api/delete-subjects/:id`,
    method: 'get',
  },
  // chapter
  DeleteChapter: {
    url: `${backendDomain}/api/chapter/:id`,
    method: 'delete',
  },
  getChapter: {
    url: `${backendDomain}/api/chapter`,
    method: 'get',
  },
  // questions
  Getquestion: {
    url: `${backendDomain}/api/question`,
    method: 'get',
  },
  Question: {
    url: `${backendDomain}/api/question/:id`,
    method: 'get',
  },
  getPracticeModaldata: {
    url: `${backendDomain}/api/getpracticeModal`,
    method: 'get',
  },
  getALLstudent: {
    url: `${backendDomain}/api/totalStudents`,
    method: 'get',
  },
  // result data
  getTestResult: {
    url: `${backendDomain}/api/test-result`,
    method: 'get',
  },
  TestResult: {
    url: `${backendDomain}/api/test-result/:id`,
    method: 'get',
  },
  TestResultupdate: {
    url: `${backendDomain}/api/test-result/:id`,
    method: 'get',
  },
  AdmitcardResult: {
    url: `${backendDomain}/api/upload-url/:id`,
    method: 'put',
  },
  getAdmitcardResult: {
    url: `${backendDomain}/api/upload-url`,
    method: 'put',
  },
  login: {
    url: `${backendDomain}/api/login`,
    method: 'post',
  },
  Registerlogin: {
    url: `${backendDomain}/api/registerlogin`,
    method: 'post',
  },
  requestpasswordreset: {
    url: `${backendDomain}/api/requestpasswordreset`,
    method: 'post',
  },
  resetpasswordLink: {
    url: `${backendDomain}/api/reset-password`,
    method: 'post',
  },
  getNewsLetterImages: {
    url: `${backendDomain}/api/getNewsLetterImages`,
    method: 'get',
  },
  NewsLuploads: {
    url: `${backendDomain}/api/NLuploads`,
    method: 'post',
  },
  NLuploadsdelete: {
    url: `${backendDomain}/api/NLuploadsdelete`,
    method: 'delete',
  },
  Getsession: {
    url: `${backendDomain}/api/getsession`,
    method: 'get',
  },
  uploadsession: {
    url: `${backendDomain}/api/uploadsession`,
    method: 'post',
  },
}

export default SummaryApi
