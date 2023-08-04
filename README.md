#Simple MVC To do App

## Description

To put it simply, the App takes the user's text input, gets it into the array, stringifies the array into a cookie and then renders all the tasks from the very same cookie. Seeing how cookies are a way to store small pieces of data on the client's browser, it seemed convenient to create a reminder App without using a database or being dependant on internet connection (cookies are stored in the browser whether online or not).

## Functionalities 

- Uses a cookie to store the information about your tasks, instead of using your own memory or a database;

- Keeps the info about all tasks for 30 days, until the next update from which point it exstends the expiry period for another 30 days for all tasks (as all of them are in the same array) thus you don't need to worry about the expiry period of an individual task;

- It works fast and is very easy to use with a simple 'add' and 'delete' button

## Architecture

This App is built by using MVC architecture (pattern), meaning it has 3x main components:

 - Model -- which represents the application's data
 - View -- which represents the user interface 
 - Controller -- which represents the working logic of the application 

 As such, MVC frameworks tipically make the applications easier to test and maintain.

 ## Technologies used

The App is coded in HTML and CSS, however, even though the App contains more CSS code in percentage of all - most effort was put in JavaScript.

`` Cookies & localStorage ``

In order to set-up and manipulate cookies and local storage by manipulating strings, methods such as `setCookie()`, `getCookie()`, `localStorage.getItem()`, `localStorage.setItem()`, `JSON.stringify()`, `JSON.parse()`, `date.toUTCString()`, `date.getTime()`, `charAt()`, `substring()`, `indexOf()` and others are implemented.

`` DOM manipulation & event handling ``

In order to control the rendering process as well as handle the events, methods such as `createElement()`, `appendChild()`, `getElementById()`, `addEventListener()` and others are used.

`` CSS ``

It't worth noting that the elements alignment is solely controlled by the Flexbox.

 ## Bug fix

 During App testing, it was noticed that the App is throwing an exception whenever entering the text using ';' character. The issue lies in the cookie syntax. To create a cookie, the document.cookie property is used to set the cookie value. The general syntax for setting a cookie is as follows:

 document.cookie = "cookieName=cookieValue; expires=expirationDate; path=pathValue;";

Noticed how every cookie is separated with the semicolon (';') ? To read a specific cookie a 'split()' method is used with a ';' passed to it in order to extract the cookie value. So, when a user enters a text containing a ';', to put it simply, the 'document.cookie' property is unable to determine where the cookie ends and the next cookie starts and an exception is thrown. 

This is solved by using the RegExp pattern to control the user's input.

I surely hope I made the code easier to understand

Enjoy!!!
