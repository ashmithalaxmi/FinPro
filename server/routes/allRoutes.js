const { Router } = require('express'); 
const utils = require('../utils/auth_utils')

const router = Router();

const AuthControllers = require('../controllers/auth');
const AdminControllers = require('../controllers/admin_controls')
const TimesheetControllers = require('../controllers/timesheet')
const submitFeed = require('../controllers/feedbck')


//main apis
router.get('/test',AuthControllers.test);
router.post('/login',AuthControllers.login);
router.get('/getCurrentUser',AuthControllers.getCurrentUser);
router.post('/registerUser',utils.authenticateJWT,AuthControllers.register_user);
router.post('/generateOtp',AuthControllers.generate_otp);
router.post('/changePassword',AuthControllers.change_password);
router.post('/userDetail',AuthControllers.user_detail);
router.post('/createProject',utils.authenticateJWT,AdminControllers.create_project)
router.get('/getUsersProjects',utils.authenticateJWT,AdminControllers.getUsersProjects)
router.post('/allocateProject',utils.authenticateJWT,AdminControllers.allocate_project)
router.post('/getTimesheetData',utils.authenticateJWT,TimesheetControllers.RertreiveTimesheetPerWeek)
router.get('/getUserProject',utils.authenticateJWT,TimesheetControllers.RetreiveUserProject)
router.post('/CreateUpdateTimesheets',utils.authenticateJWT,TimesheetControllers.CreateUpdateTimesheets)
router.post('/submitFeedback', submitFeed.submitFeedback)
module.exports = router;