(function () {
  'use strict';
  var appKey = 'newsID';
  var exit_btn = $('#close-modal');
  var open_btn = $('#open-modal');
  var font = $('#modal-font-id');
  var body = $('#back-body');
  var loginButton = $('#login-button')
  var error = $('#error-text')
  var slider = $('.single-item');
  var email = $('#email-input').val();
  var email_field = $('#email-input');
  var pass = $('#password-input').val();
  var user = $('#user-greetings');
  var email_symbol = '@';
  var input = document.getElementById(email - input);
  var textArray = ['Check Out Latest News Online', 'Check and Save the Most Interesting News', 'Online News Headlines', 'Read The latest Sports News', 'Lates News from the Big-Brand Agancies'];
  var counter = 0;
  var chengeHeader = setInterval(chengeHeaderText, 4000);




  function buildKey(email) {
    email = appKey + email;
    return email;
  }



  font.hide();
  //slider.addClass('body-class');
  $().ready(chengeHeaderText);

  function chengeHeaderText() {
    //$('.header-text').fadeOut(1000);
    $('.header-text').text(textArray[counter]);
    //$('.header-text').fadeIn(1000);
    counter++;
    if (counter > textArray.length) {
      counter = 0
      var chengeHeader = setInterval(chengeHeaderText, 4300);
    };

  }






  open_btn.on('click', openFunction);

  function openFunction() {
    body.addClass('body-class');
    slider.addClass('body-class');
    font.fadeIn(700);
  }



  exit_btn.on('click', exitFunction);

  function exitFunction() {
    body.removeClass('body-class');
    slider.removeClass('body-class');
    user.text('');
    font.fadeOut(700);
  }



  loginButton.on('click', tryLogin);

  function tryLogin() {
    var email = $('#email-input').val();
    var pass = $('#password-input').val();
    var checkResult = validateFields(email, pass);

    if (!checkResult) {
      //error.text(checkResult);
      error.addClass('error-text-visible');
      error.fadeIn(400);
      error.fadeOut(4000);
      error.removeClass('error-text-visible')
    } else {
      $.ajax('https://reqres.in/api/login', {
        method: 'POST',
        data: {
          "email": email,
          "password": pass,
        },
        success: onSuccessLogin,
      });
      setToLocalStorage(email, pass);

    }
  }

  function validateFields(email, pass) {
    if (!email || !pass) {
      return false
    } else
    if (pass.match(/[^A-Za-z0-9\-\_\$\^\|]+/)) {
      return false;
    } else if ($('#email-input').val().search(/@/) == (-1)) {
      return false;
    } else return true;
  }


  function emailLogin(email) {
    var flag = false;
    for (var i = 0; i <= email.length; i++) {
      if (email[i] == email_symbol) {
        flag = true;
      }
    }
    if (flag === true) {
      return true
    } else return false;
  }

  function onSuccessLogin(response) {
    console.log(response.token);

  }

  var loginSuccess = false;
  var flag = false;

  function setToLocalStorage(email, pass) {
    for (var i = 0; i <= localStorage.length; i++) {
      if (localStorage.key(i) == buildKey($('#email-input').val())) {
        flag = true;
      }
    }
    if (!flag) {
      loginSuccess = true;
      user.text('You have been registred');
      localStorage.setItem(buildKey($('#email-input').val()), pass);
    } else {
      user.text('You have been loged in')
    }
    font.fadeOut(3500);
    setInterval(body.removeClass('body-class'), 3500);
    setInterval(slider.removeClass('body-class'), 3500);
  }



  /*email_field.on('input',fulfillEmailField);



  /*var counter = 0;
  function fulfillEmailField(){
    var emailFlag = false;
    for(var i=0; i<=localStorage.length ;i++){
      if (localStorage.key(i) == (buildKey($('#email-input').val()))){
          emailFlag = true;
          } 
    }
    if (emailFlag) {
      counter++;
      switchButton(loginButton,counter);
    }
  }
    
    /*function switchButton(loginButton,counter){
      if ((counter % 2) !== 0 ){
        loginButton.fadeOut(900);
        loginButton.text('Login');
        loginButton.fadeIn(900);
      } else {
        loginButton.fadeOut(900);
        loginButton.text('Register');
        loginButton.fadeIn(900);
      }
    }*/



  slider.slick();

})()