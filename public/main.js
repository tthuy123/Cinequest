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


// Lấy nút và div bằng class
var button = document.querySelector('.review-action');
var reviewWrapper = document.querySelector('.log-wrapper');
var closeLog = document.querySelector('.close-function');

// Thêm sự kiện click vào nút
button.addEventListener('click', function() {
  // Kiểm tra nếu div đang ẩn, hiển thị nó; nếu không, ẩn nó
    reviewWrapper.style.display = 'block';
});

closeLog.addEventListener('click', function(){
  reviewWrapper.style.display = 'none';
});

// Lấy nút và div bằng class
var button = document.querySelector('.review-action');
var reviewWrapper = document.querySelector('.log-wrapper');
var closeLog = document.querySelector('.close-function');

// Thêm sự kiện click vào nút
button.addEventListener('click', function() {
  // Kiểm tra nếu div đang ẩn, hiển thị nó; nếu không, ẩn nó
    reviewWrapper.style.display = 'block';
});

closeLog.addEventListener('click', function(){
  reviewWrapper.style.display = 'none';
});

var button = document.querySelector('.watch-icon');
var span = document.querySelector('.log');

// Store the original state
var originalText = span.textContent;
var originalColor = button.style.color;

button.addEventListener('click', function() {
    if (span.textContent === originalText) {
        // Change to the new state
        span.textContent = 'IsLogged';
        this.style.color = 'rgb(5, 114, 238)';
    } else {
        // Revert to the original state
        span.textContent = originalText;
        this.style.color = originalColor;
    }
});
