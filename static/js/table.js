// ################################################################################################ //
//                                       RESOURCE TABLE ANALYSIS
// ################################################################################################ //

d3.json("/perthMarketjson")
  .then((houseData) => {
    var table = [];

    // Create a table of 20 rows of my source data
    for (var i = 0; i < 20; i++) {
      table.push(houseData[i]);
    }

    // Using Tabulator library to show the content of my resource
    new Tabulator("#resource-table", {
      data: table, //assign data to table
      autoColumns: true, //create columns from data field names
    });
  })
  .catch(function (error) {
    console.log(error);
  });
