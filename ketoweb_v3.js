// Keto Calculator

let netCarb = 25; // Net Carb instake will be 20g - 25g daily
let carbCals = netCarb * 4; // Carb cals = Net Carbs g * 4 cals
let userLbs = null;
let userFeet = null;
let userInches = null;
let userActivity = null;
let userAge = null;
let BMR = null;
let userGender = null;
let fitGoal = null;
let TDEE = null;
let proGoal = null;
let minCal = 0;
let maxCal = 0;
let proIntake = [];
let [proLow, proHigh] = [0, 0];
let proCal = [];
let userMass = null;
let userCM = null;
let BMI = null;
let userLBM = null;
let fatCal = null;

const writeData = (name, data) => {
	// name is the name of the ID you are writing to and data is the value
	var location = document.getElementById( name );
	location.textContent = data;
};

const LBM = (userLbs, BMI) => userLbs - roundTwo(userLbs*(BMI/100));

function getCheckedValue( groupName ) {
    var radios = document.getElementsByName( groupName );
    for( i = 0; i < radios.length; i++ ) {
        if( radios[i].checked ) {
            return radios[i].value;
        }
    }
    return null;
}

function getData() {
	userLbs = parseInt(document.getElementById("userLbs").value, 10);
	userFeet = parseInt(document.getElementById("userFeet").value, 10);
	userInches = parseInt(document.getElementById("userInches").value, 10);
	userActivity = activityLevel(parseInt(getCheckedValue("userActivity"),10));
	userAge = parseInt(document.getElementById("userAge").value, 10);
	userGender = getCheckedValue("userGender");
	fitGoal = getCheckedValue("fitGoal");
	proGoal = getCheckedValue("proGoal");
};

function calcData () {
	userMass = userLbs * 0.453592;
	userCM = (userFeet * 12 + userInches) * 2.54;
	BMI = userMass / (roundTwo(userCM*.01))**2;
	userLBM = LBM(userLbs, BMI);
	if (userGender === "Female") {
		BMR = 655 + (9.6 * userMass) + (1.8 * userCM) - (4.7 * userAge);
		} else if (userGender === "Male") {
			BMR = 66 + (13.7 * userMass) + (5 * userCM) - (6.8 * userAge);
		}
	if (proGoal === "gain") {  //protein multipliers depending on goals
	[proLow, proHigh] = [.8, 1.2];
		} else {
			[proLow, proHigh] = [.7, .8];
		};
	proIntake = [userLBM*proLow, userLBM*proHigh]; //grams of protein
	for (i = 0; i < proIntake.length; i++) {
		proCal[i] = roundTwo(proIntake[i] * 4); //caloric protein intake
		};
	TDEE = roundTwo(BMR * activityLevel(userActivity)[0]);
	minmax(fitGoal);
	fatCal = roundTwo(((minCal + maxCal)/2) - ((proCal[0] + proCal[1])/2) - carbCals);

};

function setData() { //16 values to set to elements... roundTwo() all
	writeData("carbG", netCarb);
	writeData("carbCal", carbCals);
	// carbPerc
	writeData("proG", roundTwo((proIntake[0] + proIntake[1])/2));
	writeData("proCal", roundTwo((proCal[0] + proCal[1])/2));
	// proPerc
	writeData("fatG", roundTwo(fatCal/9));
	writeData("fatCal", fatCal);
	// fatPerc
	writeData("BMI", roundTwo(BMI));
	writeData("LBM", roundTwo(userLBM));
	writeData("BMR", roundTwo(BMR));
	writeData("TDEE", TDEE);
	writeData("activyLevel", activityLevel(userActivity)[0]);
	writeData("minCalIn", roundTwo(minCal));
	writeData("maxCalIn", roundTwo(maxCal));
	writeData("meanCalIn", roundTwo((minCal + maxCal) / 2));
};

const inputButton = document.getElementById("inputButton");
inputButton.addEventListener("click", function(){
	getData();
	calcData();
	setData();
});

function roundTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function activityLevel (activity) {
	var multiplier;
	var description;
	switch(activity) {
		case 1:
			multiplier = 1.375;
			description = `Light Activity: Light exercise (ex. sports 1-3 times per week)`;
			break;
		case 2:
			multiplier = 1.55;
			description = `Moderately Active: Moderate exercise (ex. sports 3-5 times per week)`;
			break;
		case 3:
			multiplier = 1.725;
			description = `Very Active: Heavy exercise (ex. sports 6-7 times per week)`;
			break;
		case 4:
			multiplier = 1.9;
			description = `Extremely Active: Very heavy exercise (ex. training two times per day)`;
			break;
		default:
			multiplier = 1.2;
			description = `Sedentary: Little to no exercise (ex. Desk job and no other activity)`;
			break;
	}
	return [multiplier, description];
}



// Need protein intake: maintain LBM * .7 to .8g || gain muscle LBM * .8g to 1.2g 


// Protein cal = protein grams * 4 cals


// Remaining cals = total allowed - (carb cals + protein cals)
const minmax = (fitGoal) => {
	switch (fitGoal) {
		case "lose":
			minCal = roundTwo(TDEE - (TDEE * .15));
			maxCal = roundTwo(TDEE - (TDEE * .1));
			break;
		case "maintain":
			minCal = roundTwo(TDEE - 100);
			maxCal = roundTwo(TDEE + 100);
			break;
		case "gain":
			minCal = roundTwo(TDEE + (TDEE * .1));
			maxCal = roundTwo(TDEE + (TDEE * .15));
			break;		
		default:
			minCal = roundTwo(TDEE - 100);
			maxCal = roundTwo(TDEE + 100);
			break;
	} return [minCal, maxCal];
};
// fat g = fat (remaining cals) / 9 cals
/* 
alternate fat intake formula

*/

// ================== Temp storage ===================
/*
do {
userGender = prompt('Are you Male or Female?'); //gather user gender
userGender = capGender(userGender);
}
while (userGender !== "Male" && userGender !== "Female"); // continue to ask for male or female. Later change to radio selectors
*/

//netCarb = prompt("What is your daily net carb intake?\n(Goal should be between 20g and 25g");
/*
console.log(`Gender: ${userGender}`);
console.log(`Weight: ${userLbs} lbs`);
console.log(`Mass: ${roundTwo(userMass)} kg`);
console.log(`Height: ${userFeet}' ${userInches}"`);
console.log(`Height: ${roundTwo(userCM)} cm`);
console.log(`BMI: ${roundTwo(BMI)}`);
console.log(`BMR: ${roundTwo(BMR)}`);
console.log(`Lean Body Mass: ${LBM(userLbs, BMI)}`);
console.log(`TDEE: ${TDEE}`);
console.log(`Activity level: ${activityLevel(userActivity)[1]}`);
console.log("=================================");
*/
//proGoal = prompt("maintain or gain muscle?");
/*
	for (i = 0; i < proIntake.length; i++) {
		proCal[i] = roundTwo(proIntake[i] * 4);
	};
*/