import User from "../models/userModal.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { EMAIL } from "../config.js";
import getRandomNumberForOtp from "../utils/otp.js";
import { CUSTOMER } from "../constants/roles.js";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aviar2022@gmail.com",
    pass: "geyafmzlvhslpjen",
  },
});

export async function signup(req, res, next) {
  try {
    const data = req.body;
    const missingFields = [];

    const requiredFields = [
      "name",
      "blockId",
      "flatId",
      "email",
      "phoneNumber",
      "residentType",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        missingFields.push(field);
      }
    }

    // Check if the name field exceeds 150 characters
    if (data.name && data.name.length > 150) {
      return res.status(422).json({
        status: false,
        message: "Name cannot exceed 150 characters",
      });
    }

    // Check if the phoneNumber field contains only numbers
    if (data.phoneNumber && !/^\d+$/.test(data.phoneNumber)) {
      return res.status(422).json({
        status: false,
        message: "Phone number must contain only numbers",
      });
    }

    if (missingFields.length > 0) {
      return res.status(422).json({
        status: false,
        message: `${missingFields} is required fields`,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      // Create a new user
      const createUserData = await User.create({
        name: data.name,
        blockId: data.blockId,
        flatId: data.flatId,
        phoneNumber: data.phoneNumber,
        residentType: data.residentType,
        email: data.email,
        role: CUSTOMER,
        isActive: false,
        isEmailVerified: false,
      });

      // Generate JWT
      const token = jwt.sign(
        {
          email: createUserData.email,
          id: createUserData._id,
          name: createUserData.name,
          phoneNumber: createUserData.phoneNumber,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const otp = getRandomNumberForOtp(100000, 999999);

      // update token
      const updateData = await User.findByIdAndUpdate(
        createUserData._id,
        {
          sessionToken: token,
          otp: otp,
        },
        {
          runValidator: true,
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "User Register Successfully",
        data: updateData,
      });

      if (createUserData) {
        // send email notification to admin
        const htmlAdmincontent = `<p>Welcome To Aviar Apartment</strong>.
          </p>
         <p>New User <strong> ${createUserData.name}</strong> Register Successfully.
         </p>

         <p>Click here <strong>https://www.google.co.in/</strong> to view and approve new user details.</p>
          
                <p>Thanks and Regards,</p>
                <p>
                Aviar Apartment Support Team<br>
                Chennai<br>
                Tamilnadu,
                600024.</p>
                <p>Visit:  www.aviarapartment.com</p>
        `;
        var mailOptions = {
          from: EMAIL,
          to: "kharphi2022@gmail.com",
          subject: "Aviar Apartment New User",
          html: htmlAdmincontent,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("Email Error******" + error);
          }
        });

        // send email notification to customer
        const htmlcontent1 = `<p>Welcome To Aviar Apartment</strong>

           <p>Here OTP <strong>${otp}</strong> to verify email ,click here to verify 
           <strong>https://www.google.co.in/</strong>.</p>
          
          <p>Thanks and Regards,</p>
          <p>
          Admin,
          Aviar Apartment,<br>
          Chennai,<br>
          600028.</p>
          <p>Visit:  www.aviaraparment.com</p>
          `;
        var mailOptions1 = {
          from: EMAIL,
          to: "kharphi2022@gmail.com",
          subject: "Aviar Apartment Verification",
          html: htmlcontent1,
        };
        transporter.sendMail(mailOptions1, async function (error, info) {
          if (error) {
            console.log("Email Error******" + error);
          }
        });
      }
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      const firstValidationErrorField = Object.keys(validationErrors)[0];
      const errorMessage = validationErrors[firstValidationErrorField];

      return res.status(422).json({
        status: false,
        message: errorMessage,
      });
    }
    next(error);
  }
}
