let districts = {};

const DISTRICT_DATA_URL =
"https://raw.githubusercontent.com/open-admin-data/afghanistan-administrative-divisions/main/data/all-district.json";

fetch(DISTRICT_DATA_URL)
.then(response => {

  if (!response.ok) {
    throw new Error("District data could not be loaded");
  }

  return response.json();

})
.then(data => {

  districts = {};

  const aliases = {

    "Paktya": "Paktia",
    "Panjsher": "Panjshir",
    "Hirat": "Herat",
    "Hilmand": "Helmand"

  };

  data.forEach(item => {

    let province =
      item.parent.name.en;

    const district =
      item.name.local;

    province =
      aliases[province] || province;

    if (!districts[province]) {
      districts[province] = [];
    }

    districts[province].push(district);

  });

  Object.keys(districts).forEach(province => {

    districts[province] =
      [...new Set(districts[province])];

    districts[province].sort((a, b) =>
      a.localeCompare(b, "ps")
    );

  });

  if (typeof loadDistricts === "function") {
    loadDistricts();
  }

})
.catch(error => {

  console.error(
    "District data error:",
    error
  );

});
