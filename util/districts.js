const axios=require('axios');
const table=require('tty-table');
const config=require('./config')
exports.getdistricts=async(stateid)=>{
    axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`,config.config)
    .then((response)=>{
        //console.table(response.data.states);
        let header = [{
            value: "district_id",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 20,
            alias:"District ID"
          },
          {
            value: "district_name",
            color: "red",
            width: 40,
            alias:"District Name"
          }]
          const out=table(header,response.data.districts,config.options).render();
          console.log(out);
    })
    .catch((err)=>{
        console.log(err);
    })
}

