var top_perth_schools = [
  "PERTH MODERN SCHOOL",
  "PRESBYTERIAN LADIES COLLEGE",
  "PENRHOS COLLEGE",
  "CHRIST CHURCH GRAMMAR SCHOOL",
  "SANTA MARIA COLLEGE",
  "ST HILDA'S ANGLICAN SCHOOL FOR GIRLS",
  "PERTH COLLEGE",
  "ST MARY'S ANGLICAN GIRLS' SCHOOL",
  "METHODIST LADIES' COLLEGE",
  "SHENTON COLLEGE",
];

d3.csv("./csv/perth_properties.csv")
  .then(function (houseData) {
    console.log(houseData);

    // Convert string to number
    houseData.forEach((house) => {
      house.LAND_AREA = +house.LAND_AREA;
      house.CBD_DIST = +house.CBD_DIST;
      house.NEAREST_STN_DIST = +house.NEAREST_STN_DIST;
      house.NEAREST_SCH_DIST = +house.NEAREST_SCH_DIST;
      house.YEAR_SOLD = +house.YEAR_SOLD;
      house.BEDROOMS = +house.BEDROOMS;
    });

    function scatterChart(school) {
      var svgArea = d3.select("body").select("iframe");
      if (!svgArea.empty()) {
        svgArea.remove();
      }
      // // Prevent the page from refreshing
      // d3.event.preventDefault();

      // var land_size_arr = houseData.map(data => data.LAND_AREA)
      // var price_per_sqm_land_arr = houseData.map(data => data.PRICE / data.LAND_AREA)
      // var price_per_sqm_land_arr = houseData.map(data => data.PRICE )

      var dist_to_sch_arr = [];
      var price_per_sqm_land_arr = [];
      var storage = [];

      var selecteddata = houseData.filter(
        (data) => data.NEAREST_SCH === school
      );

      selecteddata.forEach((data) => {
        var dict = {
          x: data.NEAREST_SCH_DIST,
          y: Math.round(data.PRICE / data.LAND_AREA),
        };
        storage.push(dict);
      });
      // houseData.forEach((data) => {
      //   if (school === data.NEAREST_SCH) {
      //     // dist_to_sch_arr.push(data.NEAREST_SCH_DIST);
      //     // price_per_sqm_land_arr.push(data.PRICE / data.LAND_AREA);
      //     var dict = {
      //       x: data.NEAREST_SCH_DIST,
      //       y: Math.round(data.PRICE / data.LAND_AREA),
      //     };
      //     storage.push(dict);
      //   }
      // });

      // console.log(storage);

      var data = {
        datasets: [
          {
            label: "Distance to school",
            data: storage,
            backgroundColor: "rgb(255, 99, 132)",
            pointRadius: 10,
            fill: false,
            showLine: false,
          },
        ],
      };

      new Chart(document.getElementById("scatter"), {
        type: "scatter",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },

          layout: {
            padding: {
              left: 60,
              right: 100,
              bottom: 60,
            },
          },

          scales: {
            display: true,
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Price per sqm ($ /m2)",
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Distance (km)",
                },
              },
            ],
          },
        },
      });
    }

    // Initializes the page with a default plot
    function init() {
      var dropdownMenu = d3.selectAll("#selDataset");

      // Populate dropdown Menu with the test subject IDs
      top_perth_schools.forEach((school) => {
        var dataset = dropdownMenu.append("option");
        dataset.property("value", school);
        dataset.text(school);
      });

      scatterChart("PERTH MODERN SCHOOL");
    }

    // On change to the DOM, call optionChanged()
    d3.selectAll("#selDataset").on("click", optionChanged);

    // Function called by DOM changes

    function optionChanged() {
      var dropdownMenu = d3.selectAll("#selDataset");
      var selectedSchool = dropdownMenu.property("value");
      scatterChart(selectedSchool);

      // top_perth_schools.forEach((school,id) => {
      //     if (school === selectedSchool) {
      //         // var selectedID = id;
      //         scatterChart(school);

      //     }
      // }
      // );
    }

    init();
  })
  .catch(function (error) {
    console.log(error);
  });
