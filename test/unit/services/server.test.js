const chai = require("chai");
const assert = chai.assert;
const server = require('../../../server')
const testData = require('./testData');
const Server = new server();

describe(`Server`, () => {
    describe(`getParkedCars`, () => {
        it('should return null because no car is parked in the lot', async function () {
            let slots = testData.getSlots(0);
            let response = testData.response.getParkedCars.car0;
            let carsParked = Server.getParkedCars(slots);
            assert.equal(carsParked, response);
        });

        it('should return a car because one car was parked in the lot', async function () {
            let slots = testData.getSlots(1);
            let response = testData.response.getParkedCars.car1;
            let carsParked = Server.getParkedCars(slots);
            assert.equal(carsParked, response);
        });

        it('should return all 6 cars because all cars were parked in the lot', async function () {
            let slots = testData.getSlots(6);
            let response = testData.response.getParkedCars.car6;
            let carsParked = Server.getParkedCars(slots);
            assert.equal(carsParked, response);
        });
    });

    describe(`calculateParkingCharge`, () => {
        it('should return 10 because minimum and charge for 2 hours is 10', async function () {
            let response = 10;
            let charge = Server.calculateParkingCharge(1);
            assert.equal(charge, response);
        });

        it('should return 10 because minimum and charge for 2 hours is 10', async function () {
            let response = 10;
            let charge = Server.calculateParkingCharge(2);
            assert.equal(charge, response);
        });

        it('should return 20 for 3 hour charge', async function () {
            let response = 20;
            let charge = Server.calculateParkingCharge(3);
            assert.equal(charge, response);
        });

        it('should return 40 for 5 hour charge', async function () {
            let response = 40;
            let charge = Server.calculateParkingCharge(5);
            assert.equal(charge, response);
        });
    });

    describe(`getSlotNumberFromRegistrationNumber`, () => {
        it('should return a valid slot number null because no car is parked', async function () {
            let slots = testData.getSlots(0);
            let registrationNumber = testData.getRegistrationNumber(0);
            let response = testData.response.getSlotNumberFromRegistrationNumber.car0;
            let slotNumber = Server.getSlotNumberFromRegistrationNumber(registrationNumber, slots);
            assert.equal(slotNumber, response);
        });
        it('should return a valid slot number 1 of the car parked', async function () {
            let slots = testData.getSlots(6);
            let registrationNumber = testData.getRegistrationNumber(0);
            let response = testData.response.getSlotNumberFromRegistrationNumber.car1;
            let slotNumber = Server.getSlotNumberFromRegistrationNumber(registrationNumber, slots);
            assert.equal(slotNumber, response);
        });

        it('should return a valid slot number 3 of the car parked', async function () {
            let slots = testData.getSlots(6);
            let registrationNumber = testData.getRegistrationNumber(2);
            let response = testData.response.getSlotNumberFromRegistrationNumber.car3;
            let slotNumber = Server.getSlotNumberFromRegistrationNumber(registrationNumber, slots);
            assert.equal(slotNumber, response);
        });

        it('should return a valid slot number 6 of the car parked', async function () {
            let slots = testData.getSlots(6);
            let registrationNumber = testData.getRegistrationNumber(5);
            let response = testData.response.getSlotNumberFromRegistrationNumber.car6;
            let slotNumber = Server.getSlotNumberFromRegistrationNumber(registrationNumber, slots);
            assert.equal(slotNumber, response);
        });
    });
});