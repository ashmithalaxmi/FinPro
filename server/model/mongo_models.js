const mongoose = require('mongoose')

//User
const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    role: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    }
});

const otpSchema = new mongoose.Schema({
    email: {
      type: String
    },
    otp: {
      type: String,
      required:true
    }
  });

// Define Project Schema
const projectSchema = new mongoose.Schema({
  PID: {
    type: String,
    required: true,
    unique: true
  },
  client_name : {
    type:String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
});

const projectModel = mongoose.model('projects', projectSchema);

// Define Project Assignment Schema
const projectAssignmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  PID: {
    type: String,
    required: true
  },
  allocation_start: {
    type: Date,
    required: true
  },
  allocation_end: {
    type: Date,
    required: true
  }
});

const projectAssignmentModel = mongoose.model('projectAssignments', projectAssignmentSchema);

// Define Timesheet Schema
const timesheetSchema = new mongoose.Schema({
  UID:{
    type: String,
    unique: true,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  PID: {
    type: String
  },
  activity: {
    type: String
  },
  comments:{
    type: String
  },
  start_period: {
    type: Date,
    required: true
  },
  end_period: {
    type: Date,
    required: true
  },
  mon: {
    type: Number,
    required: true
  },
  tue: {
    type: Number,
    required: true
  },
  wed: {
    type: Number,
    required: true
  },
  thur: {
    type: Number,
    required: true
  },
  fri: {
    type: Number,
    required: true
  },
  sat: {
    type: Number,
    required: true
  },
  sun: {
    type: Number,
    required: true
  },
  visible:{
    type:Boolean,
    default:true
  }
});

const feedbckSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  q1:{
    type:Number
  },
  q2:{
    type:Number
  },
  q3:{
    type:Number
  },
  q4:{
    type:Number
  },
  q5:{
    type:Number
  },
  comments:{
    type:String
  }
});

const feedbckModel = mongoose.model('feedbcks', feedbckSchema);

const timesheetModel = mongoose.model('timesheets', timesheetSchema);
const UserModel = mongoose.model("users", userSchema)
const otpModel = mongoose.model("temp_otps", otpSchema)

module.exports = {
    UserModel,
    otpModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbckModel
};