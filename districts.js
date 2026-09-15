let districts = {};

const DISTRICT_DATA_URL =
"https://raw.githubusercontent.com/open-admin-data/afghanistan-administrative-divisions/main/data/all-district.json";

fetch(DISTRICT_DATA_URL)
.then(response => response.json())
.then(data => {

  districts = {};

  data.forEach(item => {

    const province = item.parent.name.local;
    const district = item.name.local;

    if (!districts[province]) {
      districts[province] = [];
    }

    districts[province].push(district);

  });

  if (typeof loadDistricts === "function") {
    loadDistricts();
  }

})
.catch(error => {

  console.error("District data error:", error);

});
