const continentSelect = document.getElementById("continent-select");
const countrySelect = document.getElementById("country-select");
const languageList = document.getElementById("languages-list");
var countryData = [];

// fetch("https://countries.trevorblades.com/", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     query:,
//   }),
// })

continentSelect.addEventListener("change", async (e) => {
  const continentCode = e.target.value;
  const countries = await getContinentCountries(continentCode);

  countrySelect.innerHTML = "";
   languageList.innerHTML = "";
  countries.forEach((country) => {
    let option = document.createElement("option");
    option.value = country.code;
    option.innerText = country.name;
    countrySelect.append(option);
    // const element = document.createElement("div");
    // element.innerHTML = country.name;
    // contryList.append(element);
  });
});
countrySelect.addEventListener("change", async (e) => {
  const countryCode = e.target.value;

  const languages = await getCountryLanguages(countryCode);
  console.log(languages);
    languageList.innerHTML = "";
    languages.forEach((language) => {

      const element = document.createElement("div");
      element.innerHTML = language.name;
      languageList.append(element);
    });
});

function getCountryLanguages(countryCode) {
  return queryFetch(
    `
  query getCountry($ID:ID!){
    country(code:$ID){
    name
    languages{
        name
    }
}
}
`,
    { ID: countryCode }
  ).then((data) => {
    console.log(data.data.country);
    return data.data.country.languages;
  });
}
function getContinentCountries(continentCode) {
  return queryFetch(
    `
    query getCountries($ID:ID!){
            continent(code:$ID){
                name
                countries{
                     name
                     code
                     
                }
            }
        }
`,
    { ID: continentCode }
  ).then((data) => {
    return data.data.continent.countries;
  });
}

queryFetch(
  `
        query{
            continents{
                name
                code
                countries{
                    name
                }
            }
        }
        `
).then(
  (data) =>
    data.data.continents.forEach((continent) => {
      //   console.log(continent);
      const option = document.createElement("option");
      option.value = continent.code;
      option.innerText = continent.name;
      continentSelect.append(option);
    })
  //   data.data.continents.forEach((continent) => {
  //     //   console.log(continent.countries);
  //     //   continent.countries.forEach(country=>{
  //     //       console.log(country);
  //     //   })

  //     countryData.push(continent);
  //   })
);

// console.log(countryData);

function queryFetch(query, variables) {
  return fetch("https://countries.trevorblades.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
}
