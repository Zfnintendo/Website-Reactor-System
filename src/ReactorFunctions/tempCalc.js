const lerpRate = 0.1;

class TemperatureCalculator {

    // init
    constructor( initTemp, rodCoeff, coolantCoeff, fwCoeff, rvCoeff, insertion, coolant, fw, rv) {

        this.calculatedTemp = initTemp + (100 - insertion) * (rodCoeff) - coolantCoeff * coolant - fwCoeff * fw - rvCoeff * rv;

        this.baseline = initTemp;
        this.rodC = rodCoeff;
        this.coolantC = coolantCoeff;
        this.fwC = fwCoeff;
        this.rvC = rvCoeff;

        this.calculatedTemp = this.baseline + (100 - insertion) * (this.rodC) - this.coolantC * coolant - this.fwC * fw - this.rvC * rv;
        this.presentTemp = this.calculatedTemp;

    }

    // Determines a target temperature based on factors
    targetTemperature(insertion, coolant, fw, rv) {

        this.calculatedTemp = this.baseline + (100 - insertion) * (this.rodC) - this.coolantC * coolant - this.fwC * fw - this.rvC * rv;

    }

    // Updates the temperature based on current and target temp.
    updateTemperature(temp, target) {

        this.presentTemp = temp + (target - temp) * lerpRate;

    }

}

export {TemperatureCalculator};