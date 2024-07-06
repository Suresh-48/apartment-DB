import User from "../models/userModal.js";
import { CUSTOMER } from "../constants/roles.js";
import nodemailer from "nodemailer";
import { EMAIL } from "../config.js";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aviar2022@gmail.com",
      pass: "geyafmzlvhslpjen",
    },
  });

export async function getCustomerList(req, res, next) {
  try {
    const customerData = await User.find({ role: CUSTOMER });

    return res.status(200).json({
      status: true,
      message: "Get Customer Data Successfully",
      data: customerData,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCustomerStatus(req, res, next) {
    try {
      const data = req.body;
      const id = req.params.id;
  
      const updateData = await User.findByIdAndUpdate(
        id,
        {
          isActive: data.status,
        },
        {
          new: true,
          runValidators: true,
        }
      );
  
      let status = data.status ? "Approved" : "Rejected";
  
      if (status == "Approved") {
        // Send approval email notification
        const htmlcontent = `
        <p>Hi ${updateData.name},</p>
        
        <p>Welcome to Aviar Apartment!</p>
      
        <p>We are pleased to inform you that your account has been <strong>approved</strong>. You can now log in and access all the features available to our residents.</p>
      
        <p>Thanks and Regards,</p>
        
        <p>
          Admin,<br>
          Aviar Apartment,<br>
          Chennai, India<br>
          600024
        </p>
      
        <p>Visit: <a href="http://www.aviarapartment.com">www.aviarapartment.com</a></p>
      `;
  
        var mailOptions = {
          from: EMAIL,
        //   to: updateData.email,
        to: "kharphi2022@gmail.com",
          subject: "Aviar Apartment Status",
          html: htmlcontent,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("Email Error******" + error);
          }
        });
      } else {
        // Send rejection email notification
        const htmlcontent1 = `
          <p>Hi ${updateData.name},</p>
          
          <p>Welcome to Aviar Apartment.</p>
        
          <p>We regret to inform you that your account application has been <strong>rejected</strong>. If you have any questions, please contact our support team for further assistance.</p>
        
          <p>Thanks and Regards,</p>
          
          <p>
            Admin,<br>
            Aviar Apartment,<br>
            Chennai, India<br>
            600024
          </p>
        
          <p>Visit: <a href="http://www.aviarapartment.com">www.aviarapartment.com</a></p>
        `;
  
        var mailOptions = {
          from: EMAIL,
        //   to: updateData.email,
        to: "kharphi2022@gmail.com",
          subject: "Aviar Apartment Status",
          html: htmlcontent1,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("Email Error******" + error);
          }
        });
      }
  
      return res.status(200).json({
        status: true,
        message: "Update User status Successfully",
        data: updateData,
      });
    } catch (err) {
      next(err);
    }
  }
  