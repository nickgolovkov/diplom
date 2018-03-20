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
  var textArray = ['Check Out The Latest News Online', 'Check and Save the Most Interesting News', 'Online News Headlines', 'Read Up-to-Dated News', 'Latest News from the Big-Brand Agancies'];
  var counter = 0;
  

  function buildKey(email) {
    email = appKey + email;
    return email;
  }


   function OffScroll() {
      var winScrollTop = $(window).scrollTop();
      $(window).bind('scroll', function () {
        $(window).scrollTop(winScrollTop);
      });
    }
  
  
  $(document).ready(function () {
    $('#news-catalog-id').addClass('news-catalog');
    $('#news-catalog-id').fadeIn(500);
    $('#news-catalog-id').css('opacity', 1);
    OffScroll();

  });

  //font.hide();
  //slider.addClass('body-class');
  //$().ready(chengeHeaderText);

  function chengeHeaderText() {
    //$('.header-text').fadeOut(1000);

    $('.header-text').fadeOut(600, function () {
      $('.header-text').text(textArray[counter]).fadeIn(600);

    })

    //$('.header-text').fadeIn(1000);
    counter++;
    if (counter > textArray.length) {
      counter = 0
    };

  }

  open_btn.on('click', openFunction);

  function openFunction() {
    body.addClass('body-class');
    font.fadeIn(700);
    OffScroll();
    chengeHeaderText().stop;
  }



  exit_btn.on('click', exitFunction);

  function exitFunction() {
    body.removeClass('body-class');
    font.fadeOut(700);
    $(window).unbind('scroll');
    var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
    var delay = 1000; // Задержка прокрутки
    $(document).ready(function () {
      $(window).scroll(function () { // При прокрутке попадаем в эту функцию
        /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
        if ($(this).scrollTop() > top_show) $('#top').fadeIn();
        else $('#top').fadeOut();
      });
      $('#top').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
        /* Плавная прокрутка наверх */
        $('body, html').animate({
          scrollTop: 0
        }, delay);
      });
    });
    chengeHeaderText().start;
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


  /*var img = document.getElementById(slider-img);
  img.style.height = document.getElementsByClassName(single-item).style.height;
  */
  //$('.news-catalog').slick();

  var API_KEY = '6dc2f16f1c6245c8ac3b8a6815dc9044';
  var sourcesUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY;
  var topHeadlinesUrlTemplate = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY;

  $.ajax({
    url: sourcesUrl,
    method: "GET",
    success: onSuccess,
  });

  function onSuccess(response) {
    var containesLenght = document.getElementsByClassName('news-img').length;
    console.log(containesLenght);
    for (var i = 0; i < containesLenght; i++) {
      $('#news-img_' + (i + 1)).css('background-image', 'url(' + response.articles[i].urlToImage + ')');
      $('#news-img-header_' + (i + 1)).html(response.articles[i].source.name);
      $('#news-text_' + (i + 1)).text(response.articles[i].title);
      $('#news-link_' + (i + 1)).attr('href', response.articles[i].url);
      $('#news-link_' + (i + 1)).html('Go To Source &rarr;');
    }

    $('#showNewsButton').on('click', showAllNews);
    $('#showLessNewsButton').on('click', showLessNews);
    var showingNews = true;


    function showAllNews() {
      if (showingNews) {
        for (var i = containesLenght; i <= 19; i++) {
          $('#news-img-wrap_1').clone().appendTo('#news-catalog-id').attr('data-id', i);
          //$('[data-id="'+i+'"]').;
          $('[data-id="' + i + '"]>.news-img').css('background-image', 'url(' + response.articles[i].urlToImage + ')');
          $('[data-id="' + i + '"]>h1').html(response.articles[i].source.name);
          $('[data-id="' + i + '"]>span').text(response.articles[i].title);
          $('[data-id="' + i + '>a"]').attr('href', response.articles[i].url);
          $('[data-id="' + i + '"]>a').html('Go To Source &rarr;');
        }
        $('#showNewsButton').fadeOut(500, function () {
          $('#showNewsButton').html('Show less news').fadeIn(500);
          showingNews = !showingNews;
        });
      } else showLessNews();
    }

    function showLessNews() {
      $('[data-id]').detach();
      $('#showNewsButton').fadeOut(500, function () {
        $('#showNewsButton').html('Show more news').fadeIn(500)
      });
      showingNews = !showingNews;
    }
  }

  /*function onSourcesRecieved(response){
    for (var i=0; i<= response.totalResults ; i++){
      if (response.articles[i].source.id === newsArray[0]){
        $('.news-catalog-items').url = response.articles[i].urlToImage;
}
      
}
    
    
    }*/

  var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
  var delay = 1000; // Задержка прокрутки
  $(document).ready(function () {
    $(window).scroll(function () { // При прокрутке попадаем в эту функцию
      /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
      if ($(this).scrollTop() > top_show) $('#top').fadeIn();
      else $('#top').fadeOut();
    });
    $('#top').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
      /* Плавная прокрутка наверх */
      $('body, html').animate({
        scrollTop: 0
      }, delay);
    });
  });


})()