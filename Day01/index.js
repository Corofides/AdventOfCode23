const fs = require('fs');
const readline = require('readline');

const Utils = require('../Utils/Utils');

let calibrationValue = 0;

Utils.processFile('./Day01/input.txt', (data) => {

  const digitsAsSpelled = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const digits = [];
  const positions = [];

  digitsAsSpelled.forEach((spelled, index) => {

    const indexOf = data.indexOf(spelled);
    const lastIndexOf = data.lastIndexOf(spelled);

    if (indexOf >= 0) {
      positions.push([indexOf, index]);
    }

    if (lastIndexOf >= 0) {
      positions.push([lastIndexOf, index]);
    }

    //data = data.replaceAll(spelled, index);

  });

  positions.sort((valA, valB) => {

    return valA[0] - valB[0];

  });

  positions.forEach((val => {
    console.log("Value", val[0], val[1]);

    data = data.substring(0, val[0]) + val[1] + data.substring(val[0] + 1);
  }));

  console.log(data);

  //console.log("Data", data);

  for (let i = 0; i < data.length; i++) {

    if (/^\d+$/.test(data[i])) {

      digits.push(data[i]);

    }

  }

  const lineValue = Number(digits[0] + digits[digits.length - 1]);
  calibrationValue += lineValue;

  console.log(calibrationValue);

});

