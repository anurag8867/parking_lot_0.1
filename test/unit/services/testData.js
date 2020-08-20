function getSlots(size = 6) {
    let slots = new Map();
    let carNumbers = ["KA-01-HH-1234", "KA-01-HH-9999", "KA-01-BB-0001", "KA-01-HH-7777", "KA-01-HH-2701", "KA-01-HH-3141",];
    carNumbers.splice(0, size).forEach((value, index, arra) => {
        slots.set(++index, value);
    });
    return slots;
}

function getRegistrationNumber(index = 0) {
    let carNumbers = ["KA-01-HH-1234", "KA-01-HH-9999", "KA-01-BB-0001", "KA-01-HH-7777", "KA-01-HH-2701", "KA-01-HH-3141",];
    return carNumbers[index];
}

let response = {
    getParkedCars: {
        car0: null,
        car1: `1           KA-01-HH-1234`,
        car6:
            `1           KA-01-HH-1234
2           KA-01-HH-9999
3           KA-01-BB-0001
4           KA-01-HH-7777
5           KA-01-HH-2701
6           KA-01-HH-3141`,
    },
    getSlotNumberFromRegistrationNumber: {
        car0: null,
        car1: 1,
        car3: 3,
        car6: 6,
    },
}

module.exports = {
    getSlots,
    getRegistrationNumber,
    response,
}