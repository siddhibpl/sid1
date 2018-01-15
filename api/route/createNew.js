var moment = require('moment');
var pool = require('../config/dbconfig.js');
date = new Date();
date = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2);

// create NewAdmin
var newAdmin = function(req, res, next) {
  console.log(req.body);
  pool.getConnection(function(err, connection) {
    if (req.body.Key == "Edit") {
      console.log("EDIT");
      var sql = 'UPDATE admin SET Name = "' + req.body.Name + '", Address ="' + req.body.Address + '",City = "' + req.body.City + '", Pincode = "' + req.body.Pincode + '" WHERE (Mobile)="' + req.body.Mobile + '"; UPDATE login SET Name = "' + req.body.Name + '" WHERE (User)="' + req.body.Mobile + '"';
      connection.query(sql, function(err, result) {
        if (err) {
          return console.log(err);
        } else {
          return res.json({
            "resCode": "OK",
            "msg": "Update Details successfully!"
          });
        }
      });
    } else {
      connection.query('SELECT * FROM login WHERE User = "' + req.body.Mobile + '" OR Email= "' + req.body.Email + '"', function(err, result) {
        if (err) {
          return next(err);
        } else {
          if (result == '') {
            connection.query('SELECT * FROM admin WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
              if (err) {
                return next(err);
              } else {
                if (result1 != '') {
                  console.log(result1);
                  return res.json({
                    "resCode": "Error",
                    "msg": "User Already Register"
                  });
                } else {
                  connection.query('INSERT INTO admin (Name,Email,Mobile,Address,City,Pincode,Date) VALUES ("' + req.body.Name + '","' + req.body.Email + '","' + req.body.Mobile + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.Pincode + '","' + date + '"); INSERT INTO login VALUES( "Admin","' + req.body.Mobile + '", "12345", "' + req.body.Name + '","' + date + '", "' + req.body.Email + '")', function(err, result2) {
                    if (err) {
                      return next(err);
                    } else {
                      console.log("result2New");
                      return res.json({
                        "resCode": "OK",
                        "msg": "New Admin Register"
                      });
                    }
                  });
                }
              }
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Mobile Number or Email ID Already Register"
            });
          }
        }
      });
    }
    connection.release();
    if (err) {
      console.log(err);
    }
  });
};

var newStudent = function(req, res, next) {
  console.log(req.body);
  pool.getConnection(function(err, connection) {
    if (req.body.Key == "Edit") {
      console.log("EDIT");
      var sql = 'UPDATE student SET Name = "' + req.body.Name + '",Father = "' + req.body.Father + '",Mother = "' + req.body.Mother + '",Dob = "' + req.body.Dob + '",Sex = "' + req.body.Sex + '", Address ="' + req.body.Address + '",City = "' + req.body.City + '",State = "' + req.body.State + '", Pincode = "' + req.body.Pincode + '", College = "' + req.body.College + '", Trade = "' + req.body.Trade + '", POY = "' + req.body.POY + '", Per = "' + req.body.Per + '", HSPer = "' + req.body.HSPer + '", Job = "' + req.body.Job + '", Experience = "' + req.body.Experience + '", LastComp = "' + req.body.LastComp + '", ExpYear = "' + req.body.ExpYear + '" WHERE (Mobile)="' + req.body.Mobile + '"; UPDATE login SET Name = "' + req.body.Name + '" WHERE (User)="' + req.body.Mobile + '"';
      connection.query(sql, function(err, result) {
        if (err) {
          return console.log(err);
        } else {
          return res.json({
            "resCode": "OK",
            "msg": "Update Details successfully!"
          });
        }
      });
    } else {
      connection.query('SELECT * FROM login WHERE User = "' + req.body.Mobile + '" OR Email= "' + req.body.Email + '"', function(err, result) {
        if (err) {
          return next(err);
        } else {
          if (result == '') {
            connection.query('SELECT * FROM student WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
              if (err) {
                return next(err);
              } else {
                if (result1 != '') {
                  console.log(result1);
                  return res.json({
                    "resCode": "Error",
                    "msg": "User Already Register"
                  });
                } else {
                  var sql = 'INSERT INTO student(Name,Father,Mother,Email,Dob,Sex,Address,City,State,Pincode,Mobile,College,Trade,POY,Per,HSPer,Job,Experience,LastComp,ExpYear,Date) VALUES ("' + req.body.Name + '","' + req.body.Father + '","' + req.body.Mother + '","' + req.body.Email + '","' + req.body.Dob + '","' + req.body.Sex + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.State + '","' + req.body.Pincode + '","' + req.body.Mobile + '","' + req.body.College + '","' + req.body.Trade + '","' + req.body.POY + '","' + req.body.Per + '","' + req.body.HSPer + '","' + req.body.Job + '","' + req.body.Experience + '","' + req.body.LastComp + '","' + req.body.ExpYear + '","' + date + '");INSERT INTO login VALUES( "Student","' + req.body.Mobile + '", "12345", "' + req.body.Name + '", "' + date + '", "' + req.body.Email + '")';
                  connection.query(sql, function(err, result2) {
                    if (err) {
                      return next(err);
                    } else {
                      console.log("result2");
                      return res.json({
                        "resCode": "OK",
                        "msg": "New Student Register"
                      });
                    }
                  });
                }
              }
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Mobile Number or Email ID Already Register"
            });
          }
        }
      });
    }
    connection.release();
    if (err) {
      console.log(err);
    }
  });
};

var newCompany = function(req, res, next) {
  console.log(req.body);
  pool.getConnection(function(err, connection) {
    if (req.body.Key == "Edit") {
      console.log("EDIT");
      var sql = 'UPDATE company SET Name = "' + req.body.Name + '",Registration = "' + req.body.Registration + '",Landline = "' + req.body.Landline + '",Email = "' + req.body.Email + '",Website = "' + req.body.Website + '",YOI = "' + req.body.YOI + '", Address ="' + req.body.Address + '",City = "' + req.body.City + '",State = "' + req.body.State + '",District ="' + req.body.District + '", Pincode = "' + req.body.Pincode + '", HR_Name = "' + req.body.HR_Name + '", Logo = "' + req.body.Logo + '" WHERE (HR_Mobile)="' + req.body.HR_Mobile + '"; UPDATE login SET Name = "' + req.body.Name + '" WHERE (User)="' + req.body.HR_Mobile + '"';
      connection.query(sql, function(err, result) {
        if (err) {
          return console.log(err);
        } else {
          return res.json({
            "resCode": "OK",
            "msg": "Update Details successfully!"
          });
        }
      });
    } else {
      connection.query('SELECT * FROM login WHERE User = "' + req.body.HR_Mobile + '" OR Email= "' + req.body.HR_Email + '"', function(err, result) {
        if (err) {
          return next(err);
        } else {
          if (result == '') {
            connection.query('SELECT * FROM company WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
              if (err) {
                return next(err);
              } else {
                if (result1 != '') {
                  console.log(result1);
                  return res.json({
                    "resCode": "Error",
                    "msg": "User Already Register"
                  });
                } else {
                  var sql = 'INSERT INTO company(Name,Registration,Landline,Email,Website,YOI,Address,City,State,Pincode,District,HR_Name,HR_Email,HR_Mobile,Logo,Date) VALUES ("' + req.body.Name + '","' + req.body.Registration + '","' + req.body.Landline + '","' + req.body.Email + '","' + req.body.Website + '","' + req.body.YOI + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.State + '","' + req.body.Pincode + '","' + req.body.District + '","' + req.body.HR_Name + '","' + req.body.HR_Email + '","' + req.body.HR_Mobile + '","' + req.body.Logo + '","' + date + '");INSERT INTO login VALUES( "Company","' + req.body.HR_Mobile + '", "12345", "' + req.body.Name + '", "' + date + '", "' + req.body.HR_Email + '")';
                  connection.query(sql, req.body, function(err, result2) {
                    if (err) {
                      return next(err);
                    } else {
                      // connection.query('INSERT INTO login VALUES( "Company","' + req.body.HR_Mobile + '", "12345", "' + req.body.Name + '")', function(err, result3) {
                      console.log("result3");
                      return res.json({
                        "resCode": "OK",
                        "msg": "New Company Register"
                      });
                      // });
                    }
                  });
                }
              }
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Mobile Number or Email ID Already Register"
            });
          }
        }
      });
    }
    connection.release();
    if (err) {
      console.log(err);
    }
  });
};

var newIti = function(req, res, next) {
  console.log(req.body);
  pool.getConnection(function(err, connection) {
    if (req.body.Key == "Edit") {
      console.log("EDIT");
      var sql = 'UPDATE college SET Name = "' + req.body.Name + '",Registration = "' + req.body.Registration + '",Landline = "' + req.body.Landline + '",Email = "' + req.body.Email + '", Mobile = "' + req.body.Mobile + '",Type = "' + req.body.Type + '", Address ="' + req.body.Address + '",City = "' + req.body.City + '",State = "' + req.body.State + '",District ="' + req.body.District + '", Pincode = "' + req.body.Pincode + '", TPO_Name = "' + req.body.TPO_Name + '", Logo = "' + req.body.Logo + '" WHERE (TPO_Mobile)="' + req.body.TPO_Mobile + '"; UPDATE login SET Name = "' + req.body.Name + '" WHERE (User)="' + req.body.TPO_Mobile + '"';
      connection.query(sql, function(err, result) {
        if (err) {
          return console.log(err);
        } else {
          return res.json({
            "resCode": "OK",
            "msg": "Update Details successfully!"
          });
        }
      });
    } else {
      connection.query('SELECT * FROM login WHERE User = "' + req.body.TPO_Mobile + '" OR Email= "' + req.body.TPO_Email + '"', function(err, result) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          if (result == '') {
            console.log("empty");
            connection.query('SELECT * FROM college WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
              if (err) {
                console.log(err);
                return next(err);
              } else {
                if (result1 != '') {
                  console.log(result1);
                  return res.json({
                    "resCode": "Error",
                    "msg": "User Already Register"
                  });
                } else {
                  connection.query('INSERT INTO college(Name,Registration,Landline,Email,Mobile,Type,Address,City,State,Pincode,District,TPO_Name,TPO_Email,TPO_Mobile,Logo,Date) VALUES ("' + req.body.Name + '","' + req.body.Registration + '","' + req.body.Landline + '","' + req.body.Email + '","' + req.body.Mobile + '","' + req.body.Type + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.State + '","' + req.body.Pincode + '","' + req.body.District + '","' + req.body.TPO_Name + '","' + req.body.TPO_Email + '","' + req.body.TPO_Mobile + '","' + req.body.Logo + '","' + date + '")', function(err, result2) {
                    if (err) {
                      console.log(err);
                      return next(err);
                    } else {
                      console.log("result2");
                      connection.query('INSERT INTO login VALUES( "College","' + req.body.TPO_Mobile + '", "12345", "' + req.body.Name + '","' + date + '","' + req.body.TPO_Email + '");INSERT INTO collegenamelist (Name) VALUES("' + req.body.Name + '")', function(err, result3) {
                        if (err) {
                          return next(err);
                        } else {
                          console.log("result3");
                          var trade = JSON.parse(req.body.Trade);
                          trade.forEach(function(x) {
                            connection.query('INSERT INTO collegewisetrade (Name,Trade) VALUES("' + req.body.Name + '","' + x + '")', function(err, result4) {
                              if (err) {
                                console.log(err);
                                return next(err);
                              } else {
                                console.log("------");
                              }
                            });
                          });
                          return res.json({
                            "resCode": "OK",
                            "msg": "New ITI College Register"
                          });
                        }
                      });
                    }
                  });
                }
              }
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Mobile Number or Email Already Register"
            });
          }
        }
      });
    }
    connection.release();
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  newAdmin : newAdmin,
  newStudent : newStudent,
  newIti : newIti,
  newCompany : newCompany,
}
