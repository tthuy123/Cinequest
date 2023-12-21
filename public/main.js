'use strict';

// variables for navbar menu toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');

// variables for navbar search toggle
const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');


// navbar menu toggle function
function navIsActive() {
  header.classList.toggle('active');
  nav.classList.toggle('active');
  navbarMenuBtn.classList.toggle('active');
}

navbarMenuBtn.addEventListener('click', navIsActive);



// navbar search toggle function
const searchBarIsActive = () => navbarForm.classList.toggle('active');

navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);

//Sign In/Up function

const wrapper = document.querySelector('.login-wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const bntPopup = document.querySelector('.navbar-signin');
const iconClose = document.querySelector('.icon-close');


registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});
loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});

bntPopup.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup');
});


var button = document.querySelector('.review-action');
var reviewWrapper = document.querySelector('.log-wrapper');
var closeLog = document.querySelector('.close-function');

button.addEventListener('click', function() {
    reviewWrapper.style.display = 'block';
});

closeLog.addEventListener('click', function(){
  reviewWrapper.style.display = 'none';
});

var button = document.querySelector('.watch-icon');
var span = document.querySelector('.log');

var originalText = span.textContent;
var originalColor = button.style.color;

button.addEventListener('click', function() {
    if (span.textContent === originalText) {
        span.textContent = 'IsLogged';
        this.style.color = 'rgb(5, 114, 238)';
    } else {
        span.textContent = originalText;
        this.style.color = originalColor;
    }
});

function showContent(cat) {
  var sections = document.getElementById("content").children;
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].id == cat) {
      sections[i].classList.toggle("w3-show");
    }
    else {
      sections[i].classList.remove("w3-show");
      sections[i].classList.add("w3-hide");
    }
  }
}

function myFunction() {
  var checkBox = document.getElementById(".list-items");
  var submitButton = document.getElementById(".add-button");
  if (checkBox.checked == true){
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

var bookmarkIcon = document.querySelector('.bookmark-icon');
var addToListWrapper = document.querySelector('.addToList-wrapper');

bookmarkIcon.addEventListener('click', function() {
  addToListWrapper.style.display = 'block';
});

var closeAddWrapper = document.querySelector('.addToList-wrapper .close-button');

closeAddWrapper.addEventListener('click', function(){
  addToListWrapper.style.display = 'none';
});


