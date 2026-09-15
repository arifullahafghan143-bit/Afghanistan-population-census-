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

  // د ولایتونو نومونه چې زموږ په ویب‌سایټ کې لږ توپیر لري
  districts["میدان وردګ"] = districts["میدان وردک"] || [];
  districts["پنجشېر"] = districts["پنجشیر"] || [];

  // که ولسوالۍ موجودې وي، ترتیب یې الفبایي کړه
  Object.keys(districts).forEach(province => {
    districts[province].sort((a, b) =>
      a.localeCompare(b, "ps")
    );
  });

  // کله چې معلومات بشپړ Load شي
  if (typeof loadDistricts === "function") {
    loadDistricts();
  }

})
.catch(error => {

  console.error("District data error:", error);

});
