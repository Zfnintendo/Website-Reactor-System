import {TemperatureCalculator } from "./ReactorFunctions/tempCalc.js";

const currentTemperature = document.getElementById("CurrentTemperature");
const insertionPercentage = document.getElementById("insertionPercentage");
const rodSlider = document.getElementById("rodSlider");
const CV1 = document.getElementById("CV1");
const CV2 = document.getElementById("CV2");
const FW = document.getElementById("FW");
const RV1 = document.getElementById("RV1");
const RV2 = document.getElementById("RV2");
const RV3 = document.getElementById("RV3");
const RV4 = document.getElementById("RV4");

const baseTemperature = 323;
const rodCoefficient = 17.77;
const coolantCoefficient = 300;
const feedwaterCoefficient = 150;
const reliefValveCoefficient = 75;

let temp = 1400;
let insertion = 55;
let isInserted = 1 // 0 for up (raise) | 1 for neutral | 2 for down (insert)
let coolantOn = 1; // 0 for off | 0.5 for 1 on | 1 for both on
let feedwaterOn = true;
let reliefValves = 4; // 0 for none, four for all

const TempCalc = new TemperatureCalculator(baseTemperature, rodCoefficient, coolantCoefficient, feedwaterCoefficient, reliefValveCoefficient, insertion, coolantOn, feedwaterOn, reliefValves);

function interpretFeedwater(fwOn) {
    if (fwOn === true) {
        return 1
    } else {
        return 0
    }
}

function interpretInsertion(isInsert, inVal) {

    if (isInsert === 0) {

        inVal += 1;

    } else if (isInsert === 2) {

        inVal -= 1;

    } 

    return Math.max(1, Math.min(100, inVal));

}

function mainProcessLoop() {

    insertion = interpretInsertion(isInserted, insertion);
    insertionPercentage.textContent =  `Insertion: ${insertion}%`

    TempCalc.targetTemperature(insertion, coolantOn, interpretFeedwater(feedwaterOn), reliefValves);

    TempCalc.updateTemperature(temp, TempCalc.calculatedTemp);

    temp = TempCalc.presentTemp;

        console.log(insertion);

}

setInterval(mainProcessLoop,100);

rodSlider.addEventListener("input", function() {

    isInserted = Number(rodSlider.value);

});
