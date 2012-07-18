(function($) {
  function submitForm(){
    var form = $(this);

    $("#errorMessage").text("");
    var email = $("#email").val();

    if (validateEmail(email)) {
      addUserToCustomerIO();
      showSuccess(form);
    } else {
      $("#errorMessage").text(email + " isn't a valid email. :(");
      $("#errorMessage").show();
    }
    return false;
  }

  // Identify the user to customer.io
  function addUserToCustomerIO(){
    if (hasSignedUp()) return;

    var email = $("#email").val();
    var firstName = $("#firstname").val();
    var id = email.replace('@', '_');
    id = id.replace('.', '_');

    _cio.identify({
      // Required Items
      id: id,
      email: email,
      created_at: Math.round( new Date().getTime()/1000), // seconds since the epoch

      // Optional (these are examples. You can name attributes what you wish)
      type: 'pre-launch',
      first_name: firstName,
      referrer: document.referrer
    });

    setSignedUp();
  };

  function showSuccess(form) {
    form.html($(form.data('successSelector')).html());
  };

  // Validate the form submission
  function validateEmail(email) { 
    // http://stackoverflow.com/a/46181/11236
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  function hasSignedUp() {
    if ($.cookie("signedUp")) { return true; }
  };

  function setSignedUp() {
    $.cookie("signedUp", true, { expires : 365 });
  }

  $.fn.signupForm = function(successSelector) {
    var form = $(this);

    form.data("successSelector", successSelector);

    if (hasSignedUp()) {
      showSuccess(form);
    } else {
      $(this).bind("submit", submitForm);
    }
  };
})(jQuery);

