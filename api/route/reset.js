var jsSHA = require("jssha");
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
var config = require('../config/config.js');
var pool = require('../config/dbconfig.js');
//nodemailer connection
var transporter = nodemailer.createTransport({
  service: config.service,
  auth: {
    type: config.authentication.type,
    user: config.authentication.user,
    clientId: config.authentication.clientId,
    clientSecret: config.authentication.clientSecret,
    refreshToken: config.authentication.refreshToken,
    accessToken: config.authentication.accessToken,
  },
})
var maillist = [
  config.maillist.admin1,
  config.maillist.admin4,
  config.maillist.admin3,
];
// otp generator function by using time based one time password algorithums
var TOTP = function() {

  var dec2hex = function(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  };

  var hex2dec = function(s) {
    return parseInt(s, 16);
  };

  var leftpad = function(s, l, p) {
    if (l + 1 >= s.length) {
      s = Array(l + 1 - s.length).join(p) + s;
    }
    return s;
  };

  var base32tohex = function(base32) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var bits = "";
    var hex = "";
    for (var i = 0; i < base32.length; i++) {
      var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
      bits += leftpad(val.toString(2), 5, '0');
    }
    for (var i = 0; i + 4 <= bits.length; i += 4) {
      var chunk = bits.substr(i, 4);
      hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex;
  };

  this.getOTP = function(secret) {
    try {
      var epoch = Math.round((new Date().getTime() / 1000.0));
      var time = leftpad(dec2hex(Math.floor(epoch / 500)), 16, "0");
      var hmacObj = new jsSHA(time, "HEX");
      var hmac = hmacObj.getHMAC(base32tohex(secret), "HEX", "SHA-1", "HEX");
      var offset = hex2dec(hmac.substring(hmac.length - 1));
      var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
      otp = (otp).substr(otp.length - 6, 6);
    } catch (error) {
      throw error;
    }
    return otp;
  };
}

function requestotp() {
  var totpObj = new TOTP();
  var otp = totpObj.getOTP("ITISECRETO");
  console.log("otp>>>>", otp)
  return otp;
}

//forgot_password
var forgot_password = function(req, res, next) {
  console.log(req.body);
  var otp = requestotp();
  var email = "";
  if (req.body.Email) {
  } else return res.send({
    "resCode": "Error",
    "msg": "email not available"
  })
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM login where (Email) = "' + req.body.Email + '"', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log("result!=empty");
          var mailOptions = {
            from: 'group.itijobs@gmail.com',
            to: req.body["Email"],
            subject: 'Reset Password-OTP',
            html: '<html><head><title>Reset Password</title></head><body><p><b>Hello ' + result[0].Name + ',</b></p><p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p><p><b>your otp is ' + " " + otp + '</b></p><p>If you did not request this, please ignore this email and your password will remain unchanged.</p><p><a href="http://localhost:8000">Redirect To Login</a></p>' + '</body></html>',
          };
          console.log("before");
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
              res.json({
                "resCode": 'Error',
                "msg": "Error!"
              });
            } else {
              console.log('Message sent: ' + info.response);
              res.json({
                "resCode": "OK",
                "msg": "OTP have been mailed to your email id successfully!"
              });
            };
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Email ID Not Available in Database"
          });
        }
      }
    });
    // And done with the connection.
    connection.release();
    // Handle error after the release.
    if (err) {
      console.log("err>>>>>",err);
    }
  });
};
// change_password
var change_password = function(req, res, next) {
  console.log(req.body);
  var otp = requestotp();
  var otpReq = req.body.Otp;
  if ((req.body.Key === undefined)||(req.body.Key === null)||(req.body.Key === '')) {
    console.log("req.body.Key === empty block");
    if(otp !== otpReq) {
      console.log("Otp Not Match");
      return res.send({"resCode": "Error","msg": "OTP not matched!"})
      res.end();
    }
  } else if(req.body.Password != req.body.Confirm) {
    console.log("req.body.Password != req.body.Confirm block");
    return res.send({"resCode": "Error","msg": "Passwords not matched!"})
    res.end();
  }console.log("else block");
  pool.getConnection(function(err, connection) {
    console.log("EDIT");
    var sql = 'UPDATE login SET Pass = "' + req.body.Password + '" WHERE (Email)="' + req.body.Email + '"';
    connection.query(sql, function(err, result) {
      if (err) {
        return console.log("db update err>>>>>",err);
      } else {
        return res.json({
          "resCode": "OK",
          "msg": "Password change successfully!"
        });
      }
    });
    connection.release();
    if (err) {
          console.log("err",err);
    }
  });
};
module.exports = {
  forgot_password: forgot_password,
  change_password: change_password,
}
