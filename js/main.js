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

var nameTitle = nameInput.previousElementSibling
var emailTitle = emailInput.previousElementSibling
var shirtTitle = document.querySelector('fieldset.shirt legend');
var activitiesTitle = document.querySelector('.activities legend');


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

//This function searches each input area of the form and either calls the checkValidity function of
//validates whether the current input is valid. If not, then the function tranforms the form to provide
//easy to follow direction for the user about what is wrong and how they should proceed. If the input is
//valid then the function transforms the form to reflect that (back to it's initial style). For the credit
//card validation functions following this function, the setCustomValidity built in function was used
//to set the validity based on the current input provided by the user.
const validateOtherInputs = () => {
	if (!nameInput.checkValidity()) {
		nameInput.placeholder = 'Please enter your name';
		nameTitle.style.color = 'red';
		nameTitle.textContent = 'Name:*';
	} else {
		nameTitle.style.color = '#0b6141';
		nameTitle.textContent = 'Name:';
	}
	if (!emailInput.checkValidity()) {
		emailInput.placeholder = 'Please enter your email';
		emailTitle.style.color = 'red';
		emailTitle.textContent = 'Email:*';
	} else {
		emailTitle.style.color = '#0b6141';
		emailTitle.textContent = 'Email:';
	}
	if (coloursDiv.style.display === 'none'){
		shirtTitle.style.color = 'red';
		shirtTitle.textContent = 'T-Shirt Info:* Pick a shirt yo!';
	} else {
		shirtTitle.style.color = '#0b6141';
		shirtTitle.textContent = 'T-Shirt Info:';
	}
	if (!validateCheckboxes()) {
		activitiesTitle.style.color = 'red';
		activitiesTitle.textContent = "Register for Activities:* Don't forget to pick an activity!"
	} else {
		activitiesTitle.style.color = '#0b6141';
		activitiesTitle.textContent = "Register for Activities:"
	}
};

const validateCCInput = (inputcheck) => {
	let re = /[0-9]{13}|[0-9]{14}|[0-9]{15}|[0-9]{16}/;
	if (!creditCardInput.checkValidity()) {
		creditCardInput.previousElementSibling.style.color = 'red';
		if (!inputcheck) {
			creditCardInput.setCustomValidity('Please enter a valid Card number');
		} else if (!re.exec(inputcheck)){
			creditCardInput.setCustomValidity('Please enter a valid Card number that is between 13 and 16 digits long.');
		} else {
			creditCardInput.setCustomValidity('');
		}
	}
	if (re.exec(inputcheck)) {
		creditCardInput.previousElementSibling.style.color = '#0b6141';
	}
};

const validateZipInput = (inputcheck) => {
	let re = /[0-9]{5}/;
	if (!zipCodeInput.checkValidity()) {
		zipCodeInput.previousElementSibling.style.color = 'red';
		if (!inputcheck) {
			zipCodeInput.setCustomValidity('Please enter a valid Zip Code');
		} else if (!re.exec(inputcheck)){
			zipCodeInput.setCustomValidity('Please enter a valid Zip Code that is 5 digits long.');
		} else {
			zipCodeInput.setCustomValidity('');
		}
	} 
	if (re.exec(inputcheck)) {
		zipCodeInput.previousElementSibling.style.color = '#0b6141';
	}
};

const validateCVVInput = (inputcheck) => {
	let re = /[0-9]{3}/;
	if (!cvvInput.checkValidity()) {
		cvvInput.previousElementSibling.style.color = 'red';
		if (!inputcheck) {
			cvvInput.setCustomValidity('Please enter a valid CVV Code');
		} else if (!re.exec(inputcheck)){
			cvvInput.setCustomValidity('Please enter a valid CVV Code that is exactly 3 digits long.');
		}		else{
			cvvInput.setCustomValidity('');
		}
	} 
	if (re.exec(inputcheck))  {
		cvvInput.previousElementSibling.style.color = '#0b6141';
	}
};

//This function validates each individual check box. If the check box is checked then the checkedBox
//variable is incremented by 1. After all checkboxes have been iterated, if the checkedBox variable is
//less than 1, then at least 1 box has not been checked and the function returns false. Else it returns
//true.
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

//This function sets the requirements of each input in the credit card section to true (assuming
//credit card has been selected as a payment option by the user).
const setRequiredTrue = () => {
	creditCardInput.required = true;
	zipCodeInput.required = true;
	cvvInput.required = true;
};

//This sets the requirements of each cc section to false (and clears the current input if any)
const setRequiredFalse = () => {
	creditCardInput.required = false; creditCardInput.value = "";
	zipCodeInput.required = false; zipCodeInput.value = "";
	cvvInput.required = false; cvvInput.value = "";
};

//Initially appends the created totalDiv to the checkbox fieldset, setting the class for the css.
fieldsetActivites.append(totalDiv);
totalDiv.className = 'total-div';

// Set the default focus on Name input element
getFocus.focus();

nameInput.addEventListener('keyup', () => {
	nameTitle.style.color = '#0b6141';
	nameTitle.textContent = 'Name:';
});

emailInput.addEventListener('keyup', () => {
	emailTitle.style.color = '#0b6141';
	emailTitle.textContent = 'Email:';
});

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
	if (coloursDiv.style.display != 'none'){
	shirtTitle.style.color = '#0b6141';
	shirtTitle.textContent = 'T-Shirt Info:';
	}
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
		activitiesTitle.style.color = '#0b6141';
		activitiesTitle.textContent = 'Register for Activities:';
		if (this.checked) {runningTotal+=price;}
		else if (!this.checked){runningTotal-=price;}
		handleTotal(runningTotal);
     });
}

//This sets the default view of the payment section to show the credit card payment initially
//and hide the bitcoin and paypal options.
$(creditCardDiv).slideDown(500);$(bitCoinDiv).slideUp(500);$(payPalDiv).slideUp(500);

//Each time the payment option is selected, this checks what option has been chosen and displays
//that option accordingly. The requirements setter function changes the requirements in the html
//to ensure that the values are not kept or needed if the credit card option has not been chosen.
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

//These three event listeners dynamically check the current input that has been entered in
//each of the credit card fields, displaying a message to the user based on the content that
//has been (or has not been) entered in each field. Once the correct values have been entered,
//the colour of the input title changes from red back to the default, signalling to the user that
//they have entered the correct information.
creditCardInput.addEventListener('input',() => {
	let currInput = creditCardInput.value;
	validateCCInput(currInput);
});

zipCodeInput.addEventListener('input',() => {
	let currInput = zipCodeInput.value;
	validateZipInput(currInput);
});

cvvInput.addEventListener('input',() => {
	let currInput = cvvInput.value;
	validateCVVInput(currInput);
});

//When the register button is selected, all of the relevent validation functions are called
//providing the user with alerts, prompts and messages to fix incorrect details.
$(registerButton).on('click',() => {
	validateOtherInputs(); validateCCInput(); validateZipInput(); validateCVVInput();
	if (!validateCheckboxes()) {alert('You must choose at least one activity.');validateCheckboxes();}
});