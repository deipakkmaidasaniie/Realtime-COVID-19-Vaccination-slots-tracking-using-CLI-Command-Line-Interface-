const axios = require("axios");
const table = require("tty-table");
const config = require("./config");
const inquirer = require("inquirer");
const notifier=require("node-notifier");

exports.getSlots = async (districtid, givenDate) => {
  inquirer
    .prompt([
      //pass your questions here
      {
          type:"list",
          name:"choice",
          message:"please enter age group",
          choices:[
              {
                name:"All ages",
                value:""
              },
              {
                  name:"45+",
                  value:"45",
              },
              {
                name:"18-45",
                value:"18",
              }
             
          ]
      },
      {
        type:"list",
        name:"option",
        message:"Which of the following vaccines are you looking for?",
        choices:[
            {
              name:"All",
              value:""
            },
            {
                name:"Paid",
                value:"Paid",
            },
            {
              name:"Free",
              value:"Free",
            }
           
        ]
    }
    ])
    .then((answers) => {
        //console.log(answers);
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=${givenDate}`,
          config.config
        )
        .then((response) => {
          //console.table(response.data.states);
          let header = [
            {
              value: "center",
              headerColor: "yellow",
              color: "white",
              align: "left",
              width: 120,
              alias: "Center Name",
            },
            {
              value: "address",
              color: "red",
              width: 100,
              alias: "Center Address",
            },
            {
              value: "available",
              color: "red",
              width: 40,
              alias: "Slots",
            },
            {
              value: "age",
              color: "green",
              width: 50,
              alias: "Min Age",
            },
            {
              value: "vaccine",
              color: "red",
              width: 80,
              alias: "Vaccine",
            },
            {
              value: "Fees",
              color: "green",
              width: 50,
              alias: "Fees",
            },
            {
              value: "Date",
              color: "white",
              width: 70,
              alias: "Date",
            },
          ];
          var finalData = [];
          response.data.centers.forEach((center) => {
            center.sessions.forEach((session) => {
                if(answers.choice=="" && answers.option==""){
              var requiredData = {
                center: center.name,
                address: center.address,
                available: session.available_capacity,
                age: session.min_age_limit,
                vaccine: session.vaccine,
                Fees: center.fee_type,
                Date: session.date,
              };
              finalData.push(requiredData);
              if(center.name==='GMERS CIVIL HOSPITAL SOLA 1' && session.available_capacity>0){
                notifier.notify({
                    title:"Cowin slots available",
                    subtitle:"Book your appointment fast",
                    message:`${session.available_capacity} slots available at ${center.name}! Click here to book your appointment for vaccination.`,
                    wait:true
                })
              }
            }
            else if(answers.choice=="" && answers.option==center.fee_type){
                var requiredData = {
                  center: center.name,
                  address: center.address,
                  available: session.available_capacity,
                  age: session.min_age_limit,
                  vaccine: session.vaccine,
                  Fees: center.fee_type,
                  Date: session.date,
                };
                finalData.push(requiredData);
              }
            else if(answers.choice==session.min_age_limit && answers.option==center.fee_type){
                var requiredData = {
                  center: center.name,
                  address: center.address,
                  available: session.available_capacity,
                  age: session.min_age_limit,
                  vaccine: session.vaccine,
                  Fees: center.fee_type,
                  Date: session.date,
                };
                finalData.push(requiredData);
            }
            else if(answers.choice==session.min_age_limit && answers.option==""){
                var requiredData = {
                  center: center.name,
                  address: center.address,
                  available: session.available_capacity,
                  age: session.min_age_limit,
                  vaccine: session.vaccine,
                  Fees: center.fee_type,
                  Date: session.date,
                };
                finalData.push(requiredData);
            }
            });
        
          });
          //console.log(finalData);
          const out = table(header, finalData, config.options).render();
          console.log(out);
        })
        .catch((err) => {
          console.log(err);
        });
    });
};
