$(document).ready(function() {
  // var version = detectIE();
  //
  //     if(version <= 9){
  //          if(version !== false){
  //             window.location.href = "html/browserError.html";
  //         }
  //     }
  //     function detectIE() {
  //           var ua = window.navigator.userAgent;
  //           var msie = ua.indexOf('MSIE ');
  //           if (msie > 0) {
  //               // IE 10 or older => return version number
  //               return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  //           }
  //           var trident = ua.indexOf('Trident/');
  //           if (trident > 0) {
  //               // IE 11 => return version number
  //               var rv = ua.indexOf('rv:');
  //               return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  //           }
  //
  //           var edge = ua.indexOf('Edge/');
  //           if (edge > 0) {
  //               // Edge (IE 12+) => return version number
  //               return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  //           }
  //
  //           // other browser
  //           return false;
  //       }
  // $("#gallery").unitegallery();
  sessionStorage.clear();
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

  $(".aboutIti").click(function() {
    $('#exampleModalLongTitle').html("About ITI Jobs");
    $('.modal-body').html(y);
  });
  // $(".nav-item").click(function() {
  //   $('.nav-item').removeClass("active")
  //   $(this).addClass("active");
  // });
  $('.contactUs').click(function() {
    $('html,body').animate({
      scrollTop: $("#contact-form").offset().top
    }, 800);
  });
  /* Password Image settings*/
  $('.img').addClass('hide');
  $('#password').hover(function() {
    $('.img').removeClass('hide');
  }, function() {
    $('.img').addClass('hide');
  });
  $('.img').hover(function() {
    $('.img').removeClass('hide');
  }, function() {
    $('.img').removeClass('hide');
  });

  $("#signupForm").validate({
    rules: {
      mobi: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 12,
      },

    },
    messages: {
      mobi: {
        required: "Please enter Your Mobile Number",
        digits: "Please enter a valid Mobile Number",
        minlength: "Please put 10  digit mobile number",
        maxlength: "Please put 10  digit mobile number"
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
        maxlength: "Your password must be at most 12 characters long",
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
  // Back to Top
  backToTop();
});

function mDown() {
  password.type = 'text';
}

function mUp() {
  password.type = 'password';
}

function myFunction() {
  var em1 = document.getElementById("mobi").value;
  var pas1 = document.getElementById("password").value;
  var encodePass = btoa(pas1).toString();
  var obj = {
    "username": em1,
    "password": encodePass
  };
  console.log(obj);
  if (em1 == "") {
    contactForm();
  } else {
    $.when(Posthandler("/route/login", obj, true)).done(function(res) {
      console.log(res);
      if (res.resCode == 'OK') {
        var role = res.Role;
        var name = res.Name;
        var number = res.Number;
        var email = res.Email;
        login = {
          "Role": role,
          "Name": name,
          "Number": number,
          "Email": email,
        };
        // storagesetItem("login", login);
        sessionsetItem("login", login);
        window.location.replace("dashboard.html");
      } else if (res.resCode === 'Error') {
        console.log(res.msg);
        swal("Error!", res.msg, "error");
      }
    }).fail(function() {
      swal("Error!", "sorry unable to LogIn. please check your internet connection", "error");
    });
  }
}

function contactForm() {
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
    }
  }).fail(function() {
    swal("Error!", "sorry unable to Connect with Server. please check your internet connection", "error");
    window.location.replace("login.html");
  });
};
$.validator.setDefaults({
  submitHandler: function() {
    myFunction();
  }
});

var y = 'ITI Jobs is a portal. We will provide contact between student and comapany who have passed ITI trade and registered with the ITI Jobs Portal. On this portal registerd company find the cadidate in our database according to the trade and select a valid candidate. we are not a typical job provider we are only provide the way to candidate and companies. ITI Jobs Portal initiative is provide the skills candidate to company and company grab skills candidate.';
