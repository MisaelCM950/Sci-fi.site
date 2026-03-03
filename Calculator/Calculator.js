/*$$BMR = (10 \times \text{weight}) + (6.25 \times \text{height}) - (5 \times \text{age}) + \text{GenderOffset}$$*/
let calculatedGoals = {
  loss: 0,
  main: 0,
  gain: 0,
  weight:0
};

function updateMacroChart(){
  const selectedGoal = document.getElementById('macro-goal').value;
  const targetcalories = calculatedGoals[selectedGoal];
  const userWeightKg = calculatedGoals.weight;
  if(targetcalories === 0){return};

  const proteinGrams = Math.round((userWeightKg * 2.2));
  const proteinCalories = proteinGrams * 4;

  const fatGrams = Math.round((targetcalories * 0.25) / 9);
  const fatCalories = fatGrams * 9;

    const remainingCalories = targetcalories - proteinCalories - fatCalories;
    const carbsGrams = Math.round(remainingCalories / 4);




  const proteinPercent = Math.round((proteinCalories / targetcalories) * 100);
  const carbsPercent = Math.round((remainingCalories / targetcalories) * 100);

  const point1 = proteinPercent;
  const point2 = proteinPercent + carbsPercent;

  const pieChart = document.getElementById('pie-chart');
  
   pieChart.style.background = `conic-gradient(
    #ff0055 0% ${point1}%, 
    #00f3ff ${point1}% ${point2}%, 
    #00ff88 ${point2}% 100%
  )`;

  document.querySelector('.macro-legend p:nth-child(1)').innerHTML = `Protein (${proteinPercent}%): <span id="protein-g">${proteinGrams}</span>g`;
  document.querySelector('.macro-legend p:nth-child(2)').innerHTML = `Carbs (${carbsPercent}%): <span id="carbs-g">${carbsGrams}</span>g`;

  animateNumber("protein-g", proteinGrams, 1000);
  animateNumber("carbs-g", carbsGrams, 1000);
  animateNumber("fats-g", fatGrams, 1000);
}

function toggleHeightInputs(){
  const unit= document.getElementById("height-unit").value;
  const cmInput = document.getElementById("height-cm");
  const ftInputContainer = document.getElementById("height-ft-in");
  
  if(unit === "ft"){
    cmInput.style.display = "none";
    ftInputContainer.style.display ="flex";

  } else{
    cmInput.style.display = "block";
    ftInputContainer.style.display = "none";
  }

}
function calculateCalories(){
  let weight = parseFloat(document.getElementById("weight").value);
  const age = parseFloat(document.getElementById("age").value);
  const activityMultiplier = parseFloat(document.getElementById("activity").value);
  const gender = document.querySelector('input[name="gender"]:checked').value;

  const unitHeight = document.getElementById("height-unit").value;
  const unit = document.getElementById("unit").value;

  let height = 0;
  if(unitHeight === "cm"){
    height = parseFloat(document.getElementById("height-cm").value);
  } else{
    const feet = parseFloat(document.getElementById("feet").value);
    const inches = parseFloat(document.getElementById("inches").value);

    const safeInches = isNaN(inches) ? 0 : inches;
    height = (feet * 30.48) + (safeInches * 2.54);
  }


  if(isNaN(weight) || isNaN(height) || isNaN(age)){
    document.getElementById("result").innerText = "Enter a valid number"
    return;
  }

  if(unit === "lbs"){
    weight = weight / 2.20462
  }
  calculatedGoals.weight = weight;

let bmr = (10 * weight) + (6.25 * height) - (5 * age)
    if(gender === "male"){
    bmr = bmr + 5;
  }
  else{
    bmr = bmr - 161; 
  }
    

    calculatedGoals.main = Math.round(bmr * activityMultiplier);
    calculatedGoals.loss = calculatedGoals.main - 500;
    calculatedGoals.gain = calculatedGoals.main + 500;
    
    document.getElementById("result-box").style.display = "none";
    document.getElementById('loading-screen').style.display = 'block';

    setTimeout(() => {
      document.getElementById('loading-screen').style.display = "none";
      document.getElementById('result-box').style.display = "block";
      updateMacroChart();
      animateNumber("cal-loss", calculatedGoals.loss, 1000);
      animateNumber("cal-main", calculatedGoals.main, 1000);
      animateNumber("cal-gain", calculatedGoals.gain, 1000);
    }, 1500);



  
}
function animateNumber(elementId, endValue, duration){
  const element = document.getElementById(elementId);
  let startValue = 0;

  const increment = endValue / (duration / 10);

  const counter = setInterval(function(){
    startValue += increment;

    if(startValue >= endValue){
      element.innerText = endValue
      clearInterval(counter);
    } else{
      element.innerText = Math.round(startValue);
    }
  }, 10);
}
