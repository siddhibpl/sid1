var express = require('express');
var router = express.Router();
var moment = require('moment');
var btoa = require('btoa');
var atob = require('atob');
var pool = require('../config/dbconfig.js');
var config = require('../config/config.js');
var date;
date = new Date();
date = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2);
console.log(date);
//our main Restfull API
router.get('/total', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT COUNT(Name) FROM college; SELECT COUNT(Name) FROM student; SELECT COUNT(Name) FROM company', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "Total_ITI": result[0][0]['COUNT(Name)'],
            "Total_Student": result[1][0]['COUNT(Name)'],
            "Total_Company": result[2][0]['COUNT(Name)']
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Error Register"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.get('/getTradeLists', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM tradelist', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Trade List is empty"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.get('/getCollegeLists', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM collegenamelist', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "College List is empty"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.get('/getExperienceLists', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM experiencelist', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Experience List is empty"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.post('/getCollegeWiseTradeLists', function(req, res, next) {
  console.log("getCollegeWiseTradeLists>>>>>", req.body);
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM collegewisetrade where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "This College Trades List empty"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.post('/login', function(req, res, next) {
  var x = req.body.username;
  var y = req.body.password;
  var decodedString = atob(y);
  console.log(x, ".................", y,">>>>>>>",decodedString);
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM login WHERE User = "' + x + '" and Pass = "' + decodedString + '"', function(err, result) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          if ((result[0].Role == "College") || (result[0].Role == "Company")) {
            console.log("validationSubscription:Before");
            var y = validationSubscription(result);
            console.log("validationSubscription:After   And y====", y);
            if (y < 0) {
              console.log("y----", y);
              return res.json({
                "resCode": "Error",
                "msg": "your subscription has expired, please renew your account!",
              });
            } else {
              console.log("y----", y);
              return res.json({
                "resCode": "OK",
                "msg": "Validation successful!",
                "Role": result[0].Role,
                "Name": result[0].Name,
                "Number": result[0].User,
                "Date": result[0].Date,
                "Email": result[0].Email,
              });
            }
          } else {
            console.log("Else Part without Validation");
            return res.json({
              "resCode": "OK",
              "msg": "Validation successful!",
              "Role": result[0].Role,
              "Name": result[0].Name,
              "Number": result[0].User,
              "Email": result[0].Email,
            });
          }
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "User Not Valid!"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.post("/logout", function(req, res, next) {
  return res.json({
    "resCode": "OK",
    "msg": "logging out"
  });
});

router.post('/aboutMe', function(req, res, next) {
  console.log(req.body);
  pool.getConnection(function(err, connection) {
    switch (req.body.Role) {
      case "Admin":
        console.log("Admin");
        connection.query('SELECT * FROM admin where (Name) = "' + req.body.Name + '" AND (Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
          if (err) {
            return next(err);
          } else {
            if (result != '') {
              console.log(result);
              return res.json({
                "resCode": "OK",
                "results": result
              });
            } else {
              return res.json({
                "resCode": "Error",
                "msg": "Information Not existing"
              });
            }
          }
        });
        break;
      case "Student":
        console.log("Student");
        connection.query('SELECT * FROM student where (Name) = "' + req.body.Name + '" AND (Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
          if (err) {
            return next(err);
          } else {
            if (result != '') {
              console.log(result[0].ExpYear);
              console.log(result);
              connection.query('SELECT experience FROM experiencelist where (Id) = "' + result[0].ExpYear + '"', function(err, result1, feild) {
                if (err) {
                  return next(err);
                } else {
                  console.log(result1);
                  if (result[0].ExpYear != 'NA') {
                    if (req.body.Key != "Edit") {
                      result[0].ExpYear = result1[0].experience;
                    }
                  }
                  return res.json({
                    "resCode": "OK",
                    "results": result
                  });
                }
              });
            } else {
              return res.json({
                "resCode": "Error",
                "msg": "Information Not existing"
              });
            }
          }
        });
        break;
      case "College":
        console.log("College");
        connection.query('SELECT * FROM college where (Name) = "' + req.body.Name + '" AND (TPO_Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
          if (err) {
            return next(err);
          } else {
            if (result != '') {
              console.log(result);
              return res.json({
                "resCode": "OK",
                "results": result
              });
            } else {
              return res.json({
                "resCode": "Error",
                "msg": "This College Data empty Now"
              });
            }
          }
        });
        break;
      case "Company":
        console.log("Company");
        connection.query('SELECT * FROM company where (Name) = "' + req.body.Name + '" AND (HR_Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
          if (err) {
            return next(err);
          } else {
            if (result != '') {
              console.log(result);
              return res.json({
                "resCode": "OK",
                "results": result
              });
            } else {
              return res.json({
                "resCode": "Error",
                "msg": "This College Trades List empty"
              });
            }
          }
        });
        break;
      default:
        console.log("Role Is Not Present");
    }
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.get('/totalCompany', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM company', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "No Company Available in Database"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.post('/viewMoreCompanyByName', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM company where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Company Not Available in Database"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.get('/totalCollege', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM college', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "No College Available in Database"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.post('/viewMoreCollegeByName', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM college where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          return res.json({
            "resCode": "OK",
            "results": result
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "College Not Available in Database"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

router.post('/studentTradeWiseFilter', function(req, res, next) {
  console.log(req.body.Role);
  pool.getConnection(function(err, connection) {
    switch (req.body.Role) {
      case "College":
        console.log("College");
        connection.query('SELECT * FROM student where (College) = "' + req.body.Name + '" AND (Trade) = "' + req.body.Trade + '" AND (Experience) = "' + req.body.Experience + '" AND (ExpYear) = "' + req.body.ExpYear + '"', function(err, result, feild) {
          if (err) {
            return next(err);
          } else {
            if (result != '') {
              console.log(result);
              return res.json({
                "resCode": "OK",
                "results": result
              });
            } else {
              return res.json({
                "resCode": "Error",
                "msg": "Sorry Students List Not Available For This Input, Try With New Input!"
              });
            }
          }
        });
        break;
      default:
        console.log("Not College");
        connection.query('SELECT * FROM student where (Trade) = "' + req.body.Trade + '" AND (Experience) = "' + req.body.Experience + '" AND (ExpYear) = "' + req.body.ExpYear + '"', function(err, result, feild) {
          if (err) {
            return next(err);
          } else {
            if (result != '') {
              console.log(result);
              return res.json({
                "resCode": "OK",
                "results": result
              });
            } else {
              return res.json({
                "resCode": "Error",
                "msg": "Sorry Students List Not Available For This Input, Try With New Input!"
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
});

router.post('/viewMoreStudentByName', function(req, res, next) {
  console.log(req.body);
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM student where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
      if (err) {
        return next(err);
      } else {
        if (result != '') {
          console.log(result);
          connection.query('SELECT experience FROM experiencelist where (Id) = "' + result[0].ExpYear + '"', function(err, result1, feild) {
            if (err) {
              return next(err);
            } else {
              console.log(result1);
              if (result[0].ExpYear != 'NA') {
                  result[0].ExpYear = result1[0].experience;
              }
              return res.json({
                "resCode": "OK",
                "results": result
              });
            }
          });
        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Student Not Available in Database"
          });
        }
      }
    });
    connection.release();
    if (err) {
      console.log(err);
    }
  });
});

function validationSubscription(result) {
  var check = moment(date, 'YYYY-MM-DD');
  var check1 = moment(result[0].Date, 'YYYY-MM-DD');
  var Next = check1.add(365, 'day');
  var NextSubc = moment(Next, 'YYYY-MM-DD');
  var y = NextSubc.diff(check, 'days');
  // console.log("YYYYYYYYYYYYY>>>>",y,  "NextSubc>>>>>>>>>>>>>>>>>>>", NextSubc,"result[0].Date>>>>>",result[0].Date,"check1>>>>>",check1);
  return y;
}
var reset = require('./reset.js');
var contect = require('./contactUs.js');
var create = require('./createNew.js');
router.post('/forgot_password', reset.forgot_password);
router.post('/change_password',reset.change_password);
router.post('/contactUs', contect.contactUs);
router.post('/newAdmin', create.newAdmin);
router.post('/newStudent',create.newStudent);
router.post('/newIti', create.newIti);
router.post('/newCompany', create.newCompany);
module.exports = router;
