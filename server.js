class Server {
    // constructor(client) {
    constructor() {
        // super();
        this.slots = new Map();
        this.parkingLotSize = null;
        this.currentSlotNumber = 0;
        this.slotAvailabilityQueue = [];
        this.run = function (command, args) {
            switch (command) {
                case 'help':
                case 'create_parking_lot':
                case 'park':
                case 'status':
                case 'leave':
                    this[command](args);
                    break;
                default:
                    console.log(`Unknown command..., Please type 'help' to know the supported commands`);
            }
        }
    }


    /**
     * create the parking lot
     * decrease parking lot as soon as someone park the car
     * so same variable can be utilized while parking the car and get to know the available capacity of the lot
     * @param {*} args
     */
    help() {
        console.log(`Available Commands:
create_parking_lot :{size of parking lot}
park :{car_number}
status
leave :{car_number}` );
    }

    /**
     * create the parking lot
     * decrease parking lot as soon as someone park the car
     * so same variable can be utilized while parking the car and get to know the available capacity of the lot
     * @param {*} args
     */
    create_parking_lot(args) {
        if (!args[0]) {
            console.log(`Need a size to create a parking lot`);
            return;
        }
        if (parseInt(args[0]) === 0) {
            console.log(`Parking lot size must be greater than 0`);
            return;
        }
        this.parkingLotSize = args[0];
        console.log(`Created parking lot with ${this.parkingLotSize} slots`);
        for (let index = 1; index <= args[0]; index++) {
            this.slots.set(index, false);
        }
        return;
    }

    /**
     * park the car into lot
     * decrease parking lot as soon as someone park the car
     * so same variable can be utilized while parking the car and get to know the available capacity of the lot
     * @param {*} args 
     */
    park(args) {
        if (!this.parkingLotSize) {
            console.log(`No parking slot created, please create a parking slot first with 'create_parking_lot' command`);
            return;
        }
        let slotNumber = this.getCurrentAvailableSlotNumber()
        if (!slotNumber) {
            console.log(`Sorry, parking lot is full`);
            return;
        }
        if (!args[0]) {
            console.log(`Need a valid registration number of a car`);
            return;
        }
        //Making sure this car is not already parked in our lot
        if (this.getSlotNumberFromRegistrationNumber(args[0], this.slots)) {
            console.log(`The car with registration number ${args[0]} is already parked with us at ` +
                `${this.getSlotNumberFromRegistrationNumber(args[0])} slot number`);
            return;
        }
        this.slots.set(slotNumber, args[0]);
        console.log(`Allocated slot number: ${slotNumber}`);
    }

    /**
     * status of the parking lot.
     * @param {*} args
     */
    status() {
        let parkedCars = this.getParkedCars(this.slots);
        if (!parkedCars) {
            console.log(`No Car parked in the lot`);
            return;
        }
        console.log(`Slot No.    Registration No.\n${parkedCars}`);
    }

    /**
     * take out the car from lot
     * increase parking lot as soon as someone took out the car
     * so same variable can be utilized while parking the car and get to know the available capacity of the lot
    * @param {*} args
    */
    leave(args) {
        if (!args[0]) {
            console.log(`Need a valid registration number of a car`);
            return;
        }
        let slotNumber = this.getSlotNumberFromRegistrationNumber(args[0], this.slots);
        //Making sure this car is parked in our lot
        if (!slotNumber) {
            console.log(`Registration number ${args[0]} not found`);
            return;
        }
        if (!args[1]) {
            console.log(`Need total parked hours to calculate parking charge, 1 is min hour to be charged`);
            return;
        }
        let charge = this.calculateParkingCharge(args[1]);
        this.slotAvailabilityQueue.push(slotNumber);
        this.slots.set(slotNumber, false);
        console.log(`Registration number ${args[0]} with Slot Number ${slotNumber} is free with Charge ${charge}`);
        return;
    }

    /**
     * Checking the Slot number when last car went out of here,
     * if no car went out so far, then fill the slot in consecutive fashion
     */
    getCurrentAvailableSlotNumber() {
        let slotNumber = null;
        if (this.slotAvailabilityQueue && this.slotAvailabilityQueue.length) {
            slotNumber = this.slotAvailabilityQueue[0];
            this.slotAvailabilityQueue.splice(0, 1);
        } else {
            for (let [key, value] of this.slots) {
                if (value === false) {
                    return key;
                }
            }
        }
        return slotNumber;
    }

    /**
     * Taking out the slot number whose car is about to leave (must be parked with us)
     * @param {*} carNumber 
     */
    getSlotNumberFromRegistrationNumber(carNumber, slots) {
        for (let [key, value] of slots) {
            if (carNumber === value) {
                return key;
            }
        }
        return null;
    }

    /**
     * Getting the parked cars array
     * @param {slots}
     */
    getParkedCars(slots) {
        let parkedCars = [];
        for (let [key, value] of slots) {
            if (value !== false) {
                parkedCars.push(`${key}           ${value}`);
            }
        }
        return parkedCars && parkedCars.length ? parkedCars.join('\n') : null;
    }

    /**
     * Charge applicable is $10 for first 2 hours and $10 for every additional
     * hour.
     * @param {*} hour 
     */
    calculateParkingCharge(hour) {
        if (parseInt(hour) === 1 || parseInt(hour) === 2) return 10;
        return 10 + 10 * (parseInt(hour) - 2)
    }

}

module.exports = Server;