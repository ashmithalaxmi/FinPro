const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { transporter } = require('../utils/auth_utils');
const { UserModel,
    otpModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel } = require('../model/mongo_models');

    
const login = async (req, res) => {
    try {
        const result = await UserModel.find();
        const { email, password } = req.body;
        const user = await result.find(u => { return u.email === email && u.password === password });

        if (user) {
            const accessToken = jwt.sign({ user_id: user.user_id, email: user.email, first_name: user.first_name, role: user.role }, accessTokenSecret);
            res.json({
                accessToken,
                role:user.role
            });
        } else {
            res.json({ message: 'Username or password incorrect' });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

const register_user = async (req, res) => {
    try {
        const { name, role, password, email } = req.body;

        if (req.user && req.user.role === "admin") {
            const newUser = new UserModel({
                name: name,
                role: role,
                password: password,
                email: email,
              });
              
              
              try {
                const result = await newUser.save();
                console.log(result);
                const mailData = {
                    from: 'ashmithalaxmi@jmangroup.com', 
                      to: email,   
                      subject: 'welcome to appliation',
                      text: 'mail added',
                      html: `<b>Hey there! </b> <br> Admin has added your mail to our application <br/> <br>visit /forget-password/otp?email=${encodeURIComponent(email)} to change your password</br>`,
                    };

                transporter.sendMail(mailData, function (err, info) {
                    if(err)
                        console.log(err)
                    else
                        console.log(info);
                    });
                    
                res.json({ message: "User created successfully"})
                
              } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error creating user" })
              }
            
        } else {
            res.status(403).json({ message: "Only admins can perform this function" });
        }
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ message: "Error creating user" });
    }
};

const generate_otp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({email: email});
        // const user = await result.find(u => { return u.email === email});
    
        if (user) {
            const otp = Math.floor(10000 + Math.random() * 90000).toString();

            const newTempOTP = new otpModel({
                email: email,
                otp: otp
              });
              
              // Save the tempOTP document to the database
              try {
                const result = await newTempOTP.save();
                console.log(result); 
              } catch (error) {
                console.error(error);
              }

            // res.json({ message: "OTP created successfully" });

            const mailData = {
                from: 'ashmithalaxmi@jmangroup.com', 
                  to: email,   
                  subject: 'OTP - please do not share dude',
                  text: 'OTP requested',
                  html: `<b>Hey there! </b> <br> your otp is ${otp}<br/>`,
                };

            await transporter.sendMail(mailData);

            console.log("Mail Sent");
            return res.json({ message: "Mail Sent" });

        } else {
            return res.json({ message: "There is no email in db" })
        }

    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error generating otp' });
    }
};

const change_password = async (req, res) => {
    try {
        const { email, new_password, otp } = req.body;

        if (email && otp) {
            const check_otp = await otpModel.findOne({ email: email, otp: otp });
            if (check_otp) {
                try {
                    const updatedUser = await UserModel.findOneAndUpdate(
                        { email: email },
                        { password: new_password },
                        { new: true }
                    );

                    await otpModel.deleteOne({ email: email });

                    if (updatedUser) {
                        res.json({ message: "User password changed successfully", user: updatedUser });
                    } else {
                        res.status(500).json({ message: "Error changing password" });
                    }
                }
                catch (err) {
                    console.error('Error executing query', err);
                    res.status(500).json({ message: 'Error changing password' });
                }
            } else {
                res.json({ message: "otp not found" })
            }
        } else {
            
            res.json({ message: "There is no email or otp" })
        }

    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error changing password' });
    }
};

const user_detail = async (req,res) => {
    res.json(req.user)
}

const test = async (req, res) => {
    console.log("Health Check!")
    res.send("Server UP!!")
}

module.exports = {
    login,
    test,
    register_user,
    generate_otp,
    change_password,
    user_detail
}