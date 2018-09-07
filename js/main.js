var getFocus = document.querySelector('input#name');
var jobTitle = document.querySelector('select#title');
var jobInput = document.querySelector('input#other-title');
var shirtDesign = document.querySelector('select#design');
var shirtColours = document.querySelectorAll('select#color option');
var coloursDiv = document.querySelector('#colors-js-puns');
var activitiesCheckboxes = document.querySelectorAll('#activity-checkbox');

var fieldsetShirt = document.querySelector('.shirt');
var fieldsetActivites = document.querySelector('.activities');
var fieldsetPayment = document.querySelector('.payment');

var nameInput = document.querySelector('#name');
var emailInput = document.querySelector('#mail');
var totalDiv = document.createElement('div')
var creditCardInput = document.querySelector('#cc-num');
var zipCodeInput = document.querySelector('#zip');
var cvvInput = document.querySelector('#cvv');
var creditCardDiv = document.querySelector('#credit-card');
var payPalDiv = document.querySelector('#paypal');
var bitCoinDiv = document.querySelector('#bitcoin');
var paymentOption = document.querySelector('select#payment');
var registerButton = document.querySelector('#register-button');
var runningTotal = 0;

//This function detects whether there is a time clash, with the selected box as the variable
//comparing it with each other box (excluding its own), disabling the box and changing the text color
//if there is a clash. The function also reverses this, if the checkbox had already been disabled
const detectTimeClash = (box,time) => {
	if (!time){return false;}
	else {
		for (i=0;i<activitiesCheckboxes.length;i++){
			let compareTime = activitiesCheckboxes[i]
			if (compareTime === box) {continue;}
			else if (compareTime.nextSibling.textContent.includes(time)){
				if (compareTime.disabled) {compareTime.disabled=false; compareTime.parentElement.style.color = 'black';} 
				else {compareTime.disabled=true; compareTime.parentElement.style.color = 'grey';}
			}
		}
	}
};

//This function builds the total amount incurred from selecting each check box. It then shows this
//amount by revealing the total amount div (or hiding if the total amount is 0). 
const handleTotal = (running) => {
	if (!running) {$(totalDiv).slideUp(500);}
	else {
		totalDiv.textContent = 'Total: $'+running
		$(totalDiv).slideDown(500);
	}
};

const validateOtherInputs = () => {
	let shirtTitle = document.querySelector('fieldset.shirt legend');
	let activitiesTitle = document.querySelector('.activities legend');
	if (!nameInput.checkValidity()) {
		nameInput.previousElementSibling.style.color = 'red';
		nameInput.previousElementSibling.textContent = 'Name: (Please enter your name)';
	} else {
		nameInput.previousElementSibling.style.color = '#152c85';
		nameInput.previousElementSibling.textContent = 'Name:';
	}
	if (!emailInput.checkValidity()) {
		emailInput.previousElementSibling.style.color = 'red';
		emailInput.previousElementSibling.textContent = 'Email: (Please enter a valid email address)';
	} else {
		emailInput.previousElementSibling.style.color = '#152c85';
		emailInput.previousElementSibling.textContent = 'Email:';
	}
	if (coloursDiv.style.display === 'none'){
		shirtTitle.style.color = 'red';
		shirtTitle.textContent = 'T-Shirt Info: (Pick a shirt yo!)';
	} else {
		shirtTitle.style.color = '#326cff';
		shirtTitle.textContent = 'T-Shirt Info:';
	}
	if (!validateCheckboxes()) {
		activitiesTitle.style.color = 'red';
		activitiesTitle.textContent = "Register for Activities: (Don't forget to pick an activity!)"
	} else {
		activitiesTitle.style.color = '#326cff';
		activitiesTitle.textContent = "Register for Activities:"
	}
	if (!creditCardInput.checkValidity()) {creditCardInput.previousElementSibling.style.color = 'red';}
	if (!zipCodeInput.checkValidity()) {zipCodeInput.previousElementSibling.style.color = 'red';}
	if (!cvvInput.checkValidity()) {cvvInput.previousElementSibling.style.color = 'red';}
};

const validateCheckboxes = () => {
	let checkedBox = 0;
	activitiesCheckboxes.forEach(box => {
		if (box.checked) {
			checkedBox += 1;
		}
	})
	if (checkedBox < 1){
		return false;
	} else {
		return true;
	}	
};

const setRequiredTrue = () => {
	creditCardInput.required = true;
	zipCodeInput.required = true;
	cvvInput.required = true;
};

const setRequiredFalse = () => {
	creditCardInput.required = false;
	creditCardInput.value = "";
	zipCodeInput.required = false;
	zipCodeInput.value = "";
	cvvInput.required = false;
	cvvInput.value = "";
};



//Initially appends the created totalDiv to the checkbox fieldset, setting the class for the css.
fieldsetActivites.append(totalDiv);
totalDiv.className = 'total-div';

// Set the default focus on Name input element
getFocus.focus();

//Hide the job input element for all options except 'other'. When 'other' option is selected,
//the job input element appears (and disappears when any other option is reselected)
$(jobInput).hide()
$(jobTitle).on('change', () => {
	$(jobTitle).val() != 'other' ? $(jobInput).slideUp(500) : $(jobInput).slideDown(500);
});

//Initially hides the theme drop down menu, as there is no reason to display it if the theme
//has not been selected yet. Using the jQuery .on method, with 'change' as the event, the js
//first checks if a theme has been selected and if not, hides the colour HTML div element.
//If a design has been selected, using js conditionals the code sets the check variables content
//to either 'JS Puns' or "I ♥ JS". This check variable is used to see if the content of each 
//shirt option element's innerHTML containts the check content, through the use of a for loop.
//The subsequent for loop then finds the first element in the currently displayed array of options,
//ensures that it is visible and then selects the current default option as the first visible option
//in the select bar. 
$(coloursDiv).hide();
$(shirtDesign).on('change', () => {
	let check = '';
	if (shirtDesign.value === 'Select Theme'){$(coloursDiv).slideUp(500); return;} 
	$(coloursDiv).slideDown(500);
	shirtDesign.value === "heart js" ? check = 'JS Puns' : check = "I ♥ JS"; 
	for (i=0;i<shirtColours.length;i++){
		shirtColours[i].innerHTML.includes(check) ? $(shirtColours[i]).hide() : $(shirtColours[i]).show()
	};
	for (i=0;i<shirtColours.length;i++) {
		if (shirtColours[i].style.display === 'none') {continue;} 
			else {shirtColours[i].selected = true; break;};
	};
});

//Adds an event listener to each checkbox, finding the text content, time and price of each. These
//variables are used in the detectTimeClash and handleTotal functions to find whether a clash exists
//(and disables the related check box) and sums the total, adding it to a div at the bottom of the fieldset
//respectively.
for(i=0;i<activitiesCheckboxes.length;i++){
     var checkbox = activitiesCheckboxes[i];
     checkbox.addEventListener('click', function(){
        let thisText = this.nextSibling.textContent
		let timeCheck = thisText.slice(thisText.indexOf('—')+2,thisText.indexOf('$')-2)
		let price = parseInt(thisText.slice(thisText.indexOf('$')+1))
		detectTimeClash(this,timeCheck);
		if (this.checked) {runningTotal+=price;}
		else if (!this.checked){runningTotal-=price;}
		handleTotal(runningTotal);
     });
}

//
$(creditCardDiv).slideDown(500);$(bitCoinDiv).slideUp(500);$(payPalDiv).slideUp(500);

$(paymentOption).on('change', () => {
	if (paymentOption.value === 'credit card') {
		$(creditCardDiv).slideDown(500);$(bitCoinDiv).slideUp(500);$(payPalDiv).slideUp(500);
		setRequiredTrue();
	}
	else if (paymentOption.value === 'paypal'){
		$(creditCardDiv).slideUp(500);$(payPalDiv).slideDown(500);$(bitCoinDiv).slideUp(500);
		setRequiredFalse();
	} else {
		$(payPalDiv).slideUp(500);$(creditCardDiv).slideUp(500);$(bitCoinDiv).slideDown(500);
		setRequiredFalse();
	}
});

$(registerButton).on('click',() => {
	validateOtherInputs();
	if (!validateCheckboxes()) {alert('You must choose at least one activity.');validateCheckboxes();}
});