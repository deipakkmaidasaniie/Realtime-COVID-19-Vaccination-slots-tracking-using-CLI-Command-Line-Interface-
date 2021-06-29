const axios=require('axios');
const table=require('tty-table');
const config=require('./config');
exports.getStates=async(req,res)=>{
    axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states',config.config)
    .then((response)=>{
        //console.table(response.data.states);
        let header = [{
            value: "state_id",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 20,
            alias:"State ID"
          },
          {
            value: "state_name",
            color: "red",
            width: 40,
            alias:"State Name"
          }]
          const out=table(header,response.data.states,config.options).render();
          console.log(out);
    })
    .catch((err)=>{
        console.log(err);
    })
}

