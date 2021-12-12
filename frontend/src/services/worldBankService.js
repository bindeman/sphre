import axios from "axios";
import {WB_API_LIMIT} from "../constants";

const WorldBankService = {
    getCountryAndIndicator: async function (counntry, indicator, data) {
        let url = `v2/country/${counntry}/indicator/${indicator}`;

        const response = await axios(
            `https://api.worldbank.org/${url}?format=json&per_page=${WB_API_LIMIT}`,
        );

        if(response.data[1] && response.data[1].length > 0) {

            const dataPoints = response.data[1];
            const countryID = dataPoints[0].country.id;
            const indicatorID = dataPoints[0].indicator.id;

            if(data[[indicatorID]] == null) {
                data[[indicatorID]] = {};
                if (data[indicatorID][countryID] === null) {
                    data[indicatorID][countryID] = [];
                    data[indicatorID][countryID].length = dataPoints.length;
                }
            }
            dataPoints.map((item) => {
                if (item.value !== null) {
                    data[indicatorID][countryID].push({x: item.date, y: item.value});
                }
            });
        }

        return data;
    },

    getCountriesAndIndicators: function (countries, indicators, data) {
        let errors = [];
        let newData = {};
        let promises = [];
        for(const indicator of indicators) {
            promises.push(this.getCountriesAndIndicator(countries, indicator, data));
        }

        Promise.all(promises)
            .then((responses) => {
                responses.map((res, index) => {
                    console.log(index, res);
                })
            })
            .catch((err) => {
                console.log("ERROR receiving one", err)
            });

        return promises;
    },

    getCountriesAndIndicator: async function (countries, indicator, data) {
        const countryString = countries.join(';');
        let url = `v2/country/${countryString}/indicator/${indicator}`;

        const response = await axios(
            `https://api.worldbank.org/${url}?format=json&per_page=${WB_API_LIMIT}`,
        );

        if(response.data[1] && response.data[1].length > 0) {

            let dataPoints = response.data[1]
            const indicatorID = dataPoints[0].indicator.id;

            if(data[indicatorID] === undefined) {
                data[indicatorID] = {};
            }

            dataPoints.map((item) => {
                if (item.value !== null) {
                    if (data[indicatorID][item.country.id] == undefined) {
                        data[indicatorID][item.country.id] = [];
                    }

                    data[indicatorID][item.country.id].push({x: item.date, y: item.value});
                }
            });

            // console.log(data)
        }

        return data;
    },

    removeCountry: function (country, indicator, data) {
        delete data[country];
    },


};

export default WorldBankService;
