// ------------------------------------------------------------------------------------------------------------
// COMIC BOOK TITLE:
//
// Type your Comic Book Title in the following variable:
var ComicBookTitle = 'Welcome To The Black Pride';
// ------------------------------------------------------------------------------------------------------------
// LIST OF PAGES:
//
// Enter your list of pages in the following variable in the order that you want them to appear.
// The first two items in the list need to remain the same: 'EMPTY' and 'cover.jpg'.
// Name the first image in your Comic Book 'cover.jpg'.
// The program will automatically count the number of pages and update the page counter on the screen.
var PageSequence = ['EMPTY', 'cover.jpg', 'WTTBP_02.jpg', 'WTTBP_03.jpg', 'WTTBP_04.jpg', 'WTTBP_05.jpg'];
// ------------------------------------------------------------------------------------------------------------
//GLOBAL TRANSITIONS:
//
// Set "jQuery.fx.off" to true to turn off all the transitions in the Comic Book.
jQuery.fx.off = false;
// ------------------------------------------------------------------------------------------------------------
// PAGE TRANSITIONS:
//
// Default master Transition Effect
// Recommended default: fade
// Other options: puff, shake (shake makes the previous page "shake", reduce the FadeDelay for an earthquake effect), drop, blind, pulsate
// Each page has its own delay
var PageTransitions = ['EMPTY', 'fade', 'fade', 'fade', 'fade', 'fade'];
// ------------------------------------------------------------------------------------------------------------
// PAGE TRANSITION DELAYS:
//
// If you like to change the duration of the fade transition between pages, change the values in the PageDelays list.
// The default value is 1000 which is about 1 second.
// Increase the time to increase the duration. For example: 2000 is about 2 seconds. 500 is about half a second.
// Each page has its own delay
var PageDelays = ['EMPTY', 1000, 1000, 1000, 1000, 1000];
// ------------------------------------------------------------------------------------------------------------
// PAGE COUNTER LANGUAGE:
//
// Example: "Page 1 of 10"
pageintro = '';
pagemiddle = '/';
// ------------------------------------------------------------------------------------------------------------
// AUTO PLAY FEATURE:
//
// Set the AutoPlay variable to true to activate the self running mode.
// Set the AutoPlayDelay to the amount of time you want the pages to remain on the screen. 1000 = 1 second.
var AutoPlay = false;
var AutoPlayDelay = 1000;
// ------------------------------------------------------------------------------------------------------------
// NAVIGATION BUTTONS:
//
// Enable or disable the interface navigation buttons
var navbuttons = 'enabled';
