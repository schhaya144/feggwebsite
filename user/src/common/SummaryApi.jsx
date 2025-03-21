const backendDomain = 'https://feggbackend.onrender.com'
// const backendDomain = 'http://localhost:8006'

const SummaryApi = {
  contact: {
    url: `${backendDomain}/api/contact`,
    method: 'post',
  },
  postUserRecordDetails: {
    url: `${backendDomain}/api/post-userRecord`,
    method: 'post',
  },
  getCarouselImage: {
    url: `${backendDomain}/api/carousel-img`,
    method: 'get',
  },
  getAnnouncements: {
    url: `${backendDomain}/api/announcements`,
    method: 'get',
  },
  getuploadvideo: {
    url: `${backendDomain}/api/getuploadvideo`,
    method: 'get',
  },
  Register: {
    url: `${backendDomain}/api/register`,
    method: 'post',
  },
  Ebooks: {
    url: `${backendDomain}/api/ebooks`,
    method: 'post',
  },
  PreviousPaperpost: {
    url: `${backendDomain}/api/PreviousPaperpost`,
    method: 'post',
  },
  PreviousPaperget: {
    url: `${backendDomain}/api/PreviousPaperget`,
    method: 'get',
  },
  StoreUserDownload: {
    url: `${backendDomain}/api/storeUserDownload`,
    method: 'post',
  },
  getPracticeCards: {
    url: `${backendDomain}/api/practiceset`,
    method: 'get',
  },
  getResult: {
    url: `${backendDomain}/api/result/:resultId`,
    method: 'get',
  },
  submitpost: {
    url: `${backendDomain}/api/submit-test`,
    method: 'post',
  },
  resultAdmitcard: {
    url: `${backendDomain}/api/upload-url`,
    method: 'get',
  },
  TestResult: {
    url: `${backendDomain}/api/test-result/:resultId`,
    method: 'get',
  },
  startTest: {
    url: `${backendDomain}/api/start-test/:mockSetId`,
    method: 'get',
  },
  Blueprintget: {
    url: `${backendDomain}/api/getuploadBlueprint`,
    method: 'get',
  },
  practiceModal: {
    url: `${backendDomain}/api/submitpracticeModal`,
    method: 'post',
  },
  getStudentLernerID: {
    url: `${backendDomain}/api/getStudentLernerID`,
    method: 'post',
  },
  updateStudentLERnerID: {
    url: `${backendDomain}/api/updateStudentLERnerID/`,
    method: 'put',
  },
  getNewsLetterImages: {
    url: `${backendDomain}/api/getNewsLetterImages`,
    method: 'get',
  },
}

export default SummaryApi
