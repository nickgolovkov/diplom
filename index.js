'use strict';
var exit_btn = $('#close-modal');
var open_btn = $('#open-modal');
var font = $('#modal-font-id');
var body = $('body');
var loginButton = $('#login-button')
var error = $('#error-text')
var slider = $('.single-item');

font.hide();

open_btn.on('click',openFunction);
function openFunction(){
  body.addClass('body-class');
  slider.addClass('body-class');
  font.fadeIn(700);
}

exit_btn.on('click',exitFunction);
function exitFunction(){
  body.removeClass('body-class');
  slider.removeClass('body-class');
  font.fadeOut(700);
}



loginButton.on('click', tryLogin);

function tryLogin(){
  var email = $('#email-input').val();
  var pass = $('#password-input').val();
  var checkResult = validateFields(email, pass);
  
  if(!checkResult){
    //error.text(checkResult);
    error.addClass('error-text-visible');
    error.fadeIn(400);
    error.fadeOut(4000);
  } else {
    $.ajax('https://reqres.in/api/login',{
      method : 'POST',
      data :{
        "email": email,
        "password": pass,
      },
      success :onSuccessLogin
    })
  } 
  }

function validateFields(email,pass){
  if(!email || !pass){
    return false} else 
    if (pass.match( /[^A-Za-z0-9\-\_\$\^\|]+/ )){
      return false;
    } else return true;
  }


function onSuccessLogin(response)
{
  console.log(response.token);
}

slider.slick();





