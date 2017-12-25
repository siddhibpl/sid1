$(document).ready(function() {
  $('#example').DataTable();
  $('#example_wrapper').addClass('no-margim padding5');
  // initial loading script role wise dynamic append
  var login = sessiongetItem("login");
  console.log(login);
  var uname = login.Name;
  var unumber = login.Number;
  var urole = login.Role;
  if (urole == "Admin") {
    $('.addNewUser').removeClass('hide');
  } else {
    $('.addNewUser').addClass('hide');
  }
  $('.page-header').html("<div><i class='fa fa-tachometer' aria-hidden='true'></i> Dashboard " + urole + " - <span class='username'>" + uname + "</span></div>");
  var obj;
  $.when(Gethandler("/route/total", obj, true)).done(function(res) {
    console.log(res);
    if (res.resCode == "OK") {
      $('.total-company').html(res.Total_Company);
      $('.total-iti').html(res.Total_ITI);
      $('.total-student').html(res.Total_Student);
      $('.bodyloading').addClass('hide');
      $('#containerDiv').removeClass('hide');
    } else {
      swal("Error!", res.msg, "error");
      $('.bodyloading').addClass('hide');
      $('#containerDiv').removeClass('hide');
    }
  }).fail(function() {
    swal("Error!", "sorry unable to load Data. please check your internet connection", "error");
    $('.bodyloading').addClass('hide');
    $('#containerDiv').removeClass('hide');
  });
  if (login.Role == 'Admin') {
    $('#insertMyCard').append(admMyCard);
  } else if (login.Role == 'Company') {
    $('#insertMyCard').append(camMyCard);
  } else if (login.Role == 'College') {
    $('#insertMyCard').append(colMyCard);
  } else if (login.Role == 'Student') {
    $('#insertMyCard').append(stuMyCard);
  }
  // for dashboard click function
  $('#changepass').click(function() {
    change = {
      "Name": login.Name,
      "Number": login.Number,
      "Role": login.Role,
      "Email": login.Email,
      "Key": "Change"
    };
    console.log(change);
    sessionsetItem("change", change);
    window.location.replace("html/forgot-Password.html");
  });
  // for addNewUser click function
  $('#addNewUser').click(function() {
    window.location.replace("html/sign-up.html");
  });
  // for help click function open modal
  $('.help').click(function() {
    $('#exampleModalLongTitle').html("Help");
    // $('.listComDetailsDiv').removeClass('hide');
    // $('.modal-body').html(x);
    $('html,body').animate({
      scrollTop: $("#contact-form").offset().top
    }, 800);
  });
  // for profile click function open modal
  $('.profile').click(function() {
    $('.modal-content').removeClass('resumeModal');
    $('.editDetails').addClass('hide');
    $('.resumePdf').addClass('hide');
    $('#exampleModalLongTitle').html("Profile");
    $('.modal-body').html("<div style='text-align: center';><img src='img/student.png' style='border-radius: 50%' alt='Profile Image' height='102' width='102'><br><br><table class='myTable table-striped table-bordered'><tr><td>Name</td><td>" + uname + "</td></tr><tr><td>Number</td><td>" + unumber + "</td></tr><tr><td>Role</td><td>" + urole + "</td></tr><table></div>");
  });
  // for dashboard click function
  $('.logout').click(function() {
    // $('.listComDetailsDiv').addClass('hide');
    var obj = {};
    $.when(Posthandler("/route/logout", obj, true)).done(function(res) {
      console.log(res);
      if (res.resCode === "OK") {
        sessionremoveItem("login");
        sessionremoveItem("newAdmin");
        sessionremoveItem("secret");
        window.location.replace("login.html");
      } else {
        console.log(res.msg + "else");
        window.location.replace("login.html");
      }
    }).fail(function() {
      swal("Error!", "sorry unable to logout. please check your internet connection", "error");
      window.location.replace("login.html");
    });
  });
  // for add activeA class in comman list component in Sidebar on-click function
  $('.listComA').click(function() {
    $('.viewDetailsDiv').removeClass('hide');
    $('.listComA').removeClass('activeA');
    $(this).addClass('activeA');
    $('html,body').animate({
      scrollTop: $(".viewDetailsDiv").offset().top
    }, 800);
  });
  // for Sidebar anch0 click function About ME button
  $('.anch0').click(function() {
    aboutMeFunction();
  });
  // for Sidebar anch1 click function Total company View More
  $('.anch1').click(function() {
    totalCompanyFunction();
  });
  // for Sidebar anch2 click function Total ITI College Listed
  $('.anch2').click(function() {
    totalCollegeFunction();
  });
  // for Sidebar anch3 click function Total Students
  $('.anch3').click(function() {
    totalStudentFunction();
  });
  // for Sidebar anch4 click function
  $('.anch4').click(function() {
    $('.anchLegend').html("Total Placements");
    $('.anchPara').html("20 Student got placed by ITI Jobs Portal.<br>Some of them are below.");
    $('.headerId').html("Student ID");
    $('.headerName').html("Student Name");
    $('.headerArea').html("Student Address");
    $('.headerDetails').html("Student Qualification");
    $('#tableBody').html("<tr><td>4,001</td><td>Anita</td><td>Bhopal</td><td>Diploma</td></tr><tr><td>4,002</td><td>Rishabh</td><td>Indore</td><td>PG-Diploma</td></tr><tr><td>4,003</td><td>Ajay</td><td>Vidish</td><td>PG-Diploma</td></tr><tr><td>4,004</td><td>Ravi</td><td>Jabalpur</td><td>ITI</td></tr><tr><td>4,005</td><td>Shivendra</td><td>Indore</td><td>12th</td></tr>");
  });

  // Back to Top
  backToTop();
  // editDetails in modal Table for only about me!
  $('.editDetails').click(function() {
    secret = {
      "Name": login.Name,
      "Number": login.Number,
      "Role": login.Role,
      "Key": "Edit"
    };
    console.log(secret);
    sessionsetItem("secret", secret);
    window.location.replace("html/sign-up.html");
  });
  // Contact Us Form Validation
  $("#contact").validate({
    rules: {
      contactName: {
        required: true,
        onlyLatters: true,
      },
      contactEmail: {
        required: true,
        emailformat: true,
      },
      contactMobile: {
        digits: true,
        minlength: 10,
        maxlength: 10
      },
      contactSubject: {
        required: true,
      },
      contactText: {
        required: true,
      },

    },
    messages: {
      contactName: {
        required: "Please enter Your Name",
        onlyLatters: "Name should be text only",
      },
      contactEmail: {
        required: "Please provide Your Email Address",
        emailformat: "Please Provide Valid Email Address",
      },
      contactMobile: {
        digits: "Please enter a valid Mobile Number",
        minlength: "Please put 10  digit mobile number",
        maxlength: "Please put 10  digit mobile number"
      },
      contactSubject: {
        required: "Please provide Subject",
      },
      contactText: {
        required: "Please provide Your Message",
      },
    },
    errorElement: "em",
    errorPlacement: function(error, element) {
      // Add the `help-block` class to the error element
      error.addClass("help-block");

      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
    }
  });
});

function myFunction() {
  var contactName = $('#contactName').val();
  var contactEmail = $('#contactEmail').val();
  var contactMobile = $('#contactMobile').val();
  var contactSubject = $('#contactSubject').val();
  var contactText = $('#contactText').val();
  var obj = {
    "contactName": capitalizeFirstLetterEachWordSplitBySpace(contactName),
    "contactEmail": contactEmail,
    "contactMobile": contactMobile,
    "contactSubject": capitalize(contactSubject),
    "contactText": capitalize(contactText),
  };
  console.log(obj);
  $.when(Posthandler("/route/contactUs", obj, true)).done(function(res) {
    console.log(res);
    if (res.resCode == 'OK') {
      swal({
          title: res.resCode,
          text: res.msg,
          type: "success"
        },
        function() {
          swal.close();
          window.location.replace("login.html");
        });
    } else if (res.resCode == 'Error') {
      swal("Error!", res.msg, "error");
      window.location.replace("dashboard.html");
    }
  }).fail(function() {
    swal("Error!", "sorry unable to Connect with Server. please check your internet connection", "error");
    window.location.replace("dashboard.html");
  });
};
$.validator.setDefaults({
  submitHandler: function() {
    myFunction();
  }
});
var x = '<div class="formTitle border iti-Padding5"><div class="row no-margin headerDiv2"><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation1">Name<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation1" placeholder="Your Name" value="" required=""></div><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation2">Mobile<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation2" placeholder="Your Number" value="" required=""></div><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation2">Email<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation2" placeholder="Your Email" value="" required=""></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 no-padding"><label for="validation2">Message<i class="red"> &#42</i></label><textarea class="form-control" rows="2" id="comment" placeholder="Enter Your Message"></textarea></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 no-padding"><button type="submit" class="btn btn-primary btn-sm" name="signup" value="Sign up">Submit</button></div></div></div>';

var admMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'><i class='fa fa-cog' aria-hidden='true'></i></div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><button class='anch0 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/company.png' alt='Total Company image' width='65' height='65'><div class='total-cssD total-company'>0</div><div class='iti-dtitle'>Total Companies</div><p class='no-margin no-padding'><button class='anch1 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/itiicon.png' alt='Total ITI image' width='65' height='65'><div class='total-cssD total-iti'>0</div><div class='iti-dtitle'>Total ITI Listed</div><p class='no-margin no-padding'><button class='anch2 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/student.png' alt='Total Students image' width='65' height='65'><div class='total-cssD total-student'>0</div><div class='iti-dtitle'>Total Students</div><p class='no-margin no-padding'><button class='anch3 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div>";

var camMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'><i class='fa fa-cog' aria-hidden='true'></i></div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><button class='anch0 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/itiicon.png' alt='Total ITI image' width='65' height='65'><div class='total-cssD total-iti'>0</div><div class='iti-dtitle'>Total ITI Listed</div><p class='no-margin no-padding'><button class='anch2 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/student.png' alt='Total Students image' width='65' height='65'><div class='total-cssD total-student'>0</div><div class='iti-dtitle'>Total Students</div><p class='no-margin no-padding'><button class='anch3 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div>";

var colMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'><i class='fa fa-cog' aria-hidden='true'></i></div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><button class='anch0 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/company.png' alt='Total Company image' width='65' height='65'><div class='total-cssD total-company'>0</div><div class='iti-dtitle'>Total Companies</div><p class='no-margin no-padding'><button class='anch1 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/student.png' alt='Total Students image' width='65' height='65'><div class='total-cssD total-student'>0</div><div class='iti-dtitle'>Total Students</div><p class='no-margin no-padding'><button class='anch3 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div>";

var stuMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'><i class='fa fa-cog' aria-hidden='true'></i></div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><button class='anch0 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/company.png' alt='Total Company image' width='65' height='65'><div class='total-cssD total-company'>0</div><div class='iti-dtitle'>Total Companies</div><p class='no-margin no-padding'><button class='anch1 btn btn btn-primary listComA' role='button'>View details &raquo;</button></p></div></div>";
