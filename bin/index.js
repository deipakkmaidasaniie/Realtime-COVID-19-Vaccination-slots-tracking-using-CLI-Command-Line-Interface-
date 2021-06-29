#! /usr/bin/env node
const states = require("../util/states");
const districts = require("../util/districts");
const slots = require("../util/slots");
const program = require("commander");

//states.getStates();
//districts.getdistricts(11);
/*var todaysDate=new Date();
var date=todaysDate.getUTCDate();
var month=todaysDate.getMonth()+1;
if(month<10)
month=`0`+month;
var year=todaysDate.getFullYear();
 todaysDate=`${date}-${month}-${year}`;
//console.log(todaysDate);
slots.getSlots(154,todaysDate);*/

program
  .command("states")
  .description("list down all the states")
  .action(states.getStates);
    program
  .command("districts <stateid>")
  .description("list down all the districts of the state")
  .action(districts.getdistricts);
    program
  .command("slots <districtid> <date>")
  .description("get all the slots of a district")
  .action(slots.getSlots);

program.parse();
