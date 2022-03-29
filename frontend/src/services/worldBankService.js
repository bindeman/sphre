import axios from "axios";
import {WB_API_LIMIT} from "../constants";

const WorldBankService = {
    getCountryAndIndicator: async function (country, indicator, data) {
        let url = `v2/country/${country}/indicator/${indicator}`;

        const response = await axios(
            `https://api.worldbank.org/${url}?format=json&per_page=${WB_API_LIMIT}`,
        );

        if(response.data[1] && response.data[1].length > 0) {

            const dataPoints = response.data[1];
            const countryID = dataPoints[0].country.id;
            const indicatorID = dataPoints[0].indicator.id;

            if(data[[indicator]] === undefined) {
                data[[indicator]] = {};
                if (data[indicator][country] === undefined) {
                    data[indicator][country] = [];
                    // data[indicator][country].length = dataPoints.length;
                }
            }
            dataPoints.map((item) => {
                if (item.value !== null) {
                    if(data[indicator][country])
                    data[indicator][country].unshift({x: parseInt(item.date), y: item.value});
                }
            });
        }

        return response;
    },

    getCountriesAndIndicators: function (countries, indicators, data) {
        let promises = [];
        for(const indicator of indicators) {
            promises.unshift(this.getCountriesAndIndicator(countries, indicator, data));
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

    getCountriesAndIndicatorsOptimized: function (countries, indicators, data) {
        let promises = [];
        for(const indicator of indicators) {
            if(data[indicator] === undefined) data[indicator] = {};
            for(const country of countries) {
                if(data[indicator] === undefined || data[indicator][country] === undefined) {
                    data[indicator][country] = [];
                    promises.unshift(this.getCountryAndIndicator(country, indicator, data));
                }
            }
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

                    data[indicatorID][item.country.id].unshift({x: parseInt(item.date), y: item.value});
                }
            });
        }

        return response;
    },

    removeCountry: function (country, indicators, data) {
        for(const indicator of indicators)
            delete data[indicator][country];
    },


};

export default WorldBankService;
