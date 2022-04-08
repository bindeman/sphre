// export const countries = {
//     "Russia": "RUS",
//     "United States": "USA",
//     "France": "FR",
//     "China": "CN",
//     "Mexico": "MX",
//   }

import millify from "millify";

export const oldCountries = {
    "RU": "Russian Federation",
    "US": "United States",
    "FR": "France",
    "CN": "China",
    "MX": "Mexico",
    "DE": "Germany",
    "SA": "Saudi Arabia",
}

// export const indicators = {
//     "Fertility Rate": "SP.DYN.TFRT.IN",
//     "Population": "SP.POP.TOTL",
//     "Net Migration": "SM.POP.NETM",
//     "% of Employment": "SL.EMP.WORK.ZS",
//     "GDP": "NY.GDP.MKTP.CD"
//   }

export const WB_API_LIMIT = 520;

export const GRAPH_LINE_WIDTH_EXTRA_THICK = 7;
export const GRAPH_LINE_WIDTH_THICK = 7;
export const GRAPH_LINE_WIDTH_MED = 6;
export const GRAPH_LINE_WIDTH_THIN = 5;
export const GRAPH_LINE_WIDTH_EXTRA_THIN = 3.5;
export const GRAPH_LINE_WIDTH_ULTRA_THIN = 2.5;

export function getGraphColor(index) {
  return index >= graphColors.length ?
                  graphColors[graphColors.length - 1] :
                  graphColors[index];

}

export function getGraphLineWidth(length) {
  if(length === 1) return GRAPH_LINE_WIDTH_EXTRA_THICK;
  if(length < 3) return GRAPH_LINE_WIDTH_THICK;
  if(length < 5) return GRAPH_LINE_WIDTH_MED;
  if(length < 7) return GRAPH_LINE_WIDTH_THIN;
  if(length < 9) return GRAPH_LINE_WIDTH_EXTRA_THIN;
  if(length >= 10) return GRAPH_LINE_WIDTH_ULTRA_THIN;

}

export function changeOpacity(rgb, newOpacity = 0.00) {
  return `${rgb.substring(0, rgb.length - 5)}${newOpacity})`;
}

export const graphColors = [
    {background: "rgba(50, 173, 252, 0.20)", clear: "rgba(50, 173, 252, 0.00)", line: "rgba(50, 173, 252)"},
    {background: "rgba(245, 166, 35, 0.20)", clear: "rgba(245, 166, 35, 0.00)", line: "rgba(245, 166, 35)"},
    {background: "rgba(184, 233, 134, 0.20)", clear: "rgba(184, 233, 134, 0.00)", line: "rgba(184, 233, 134)"},
    {background: "rgba(144, 19, 254, 0.20)", clear: "rgba(144, 19, 254, 0.00)", line: "rgba(144, 19, 254)"},

    {background: "rgba(14, 75, 220, 0.20)", clear: "rgba(14, 75, 220, 0.00)", line: "rgba(14, 75, 220)"},
    {background: "rgba(244, 101, 34, 0.20)", clear: "rgba(244, 101, 34, 0.00)", line: "rgba(244, 101, 34)"},
    {background: "rgba(250, 218, 51, 0.20)", clear: "rgba(250, 218, 51, 0.00)", line: "rgba(250, 218, 51)"},
    {background: "rgba(255, 48, 175, 0.20)", clear: "rgba(255, 48, 175, 0.00)", line: "rgba(255, 48, 175)"},

    {background: "rgba(66, 0, 201, 0.20)", clear: "rgba(66, 0, 201, 0.00)", line: "rgba(66, 0, 201)"},
    {background: "rgba(159, 63, 18, 0.20)", clear: "rgba(159, 63, 18, 0.00)", line: "rgba(159, 63, 18)"},
    {background: "rgba(197, 156, 79, 0.20)", clear: "rgba(197, 156, 79, 0.00)", line: "rgba(197, 156, 79)"},
    {background: "rgba(198, 13, 106, 0.20)", clear: "rgba(198, 13, 106, 0.00)", line: "rgba(198, 13, 106)"},

    {background: "rgba(93, 128, 147, 0.20)", clear: "rgba(93, 128, 147, 0.00)", line: "rgba(93, 128, 147)"},
    {background: "rgba(247, 114, 110, 0.20)", clear: "rgba(247, 114, 110, 0.00)", line: "rgba(247, 114, 110)"},
    {background: "rgba(104, 116, 41, 0.20)", clear: "rgba(104, 116, 41, 0.00)", line: "rgba(104, 116, 41)"},
    {background: "rgba(205, 213, 23, 0.20)", clear: "rgba(205, 213, 23, 0.00)", line: "rgba(205, 213, 23)"},

    //default background color when colors run out
    {background: "rgba(155, 155, 155, 0.20)", clear: "rgba(155, 155, 155, 0.00)", line: "rgba(155, 155, 155)"},
];


export const graphOptions = {
  point: {
    borderWidth: 0,
    radius: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    color: 'rgba(0,0,0,0)',
  },
  scales: {
    x: {
      type: 'linear',
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: "interpolate",
      intersect: false,
    },
    crosshair: {
      line: {
        color: '#F66',  // crosshair line color
        width: 3        // crosshair line width
      },
      zoom: {
        enabled: true,                                      // enable zooming
        zoomboxBackgroundColor: 'rgba(66,133,244,0.2)',     // background color of zoom box
        zoomboxBorderColor: '#48F',                         // border color of zoom box
        zoomButtonText: 'Reset Zoom',                       // reset zoom button text
        zoomButtonClass: 'reset-zoom',                      // reset zoom button class
      },
      callbacks: {
        beforeZoom: () => function(start, end) {                  // called before zoom, return false to prevent zoom
          return true;
        },
        afterZoom: () => function(start, end) {                   // called after zoom
        }
      }
    }
  }



}



export const graphOptionsOld = {
  maintainAspectRatio: true,
  responsive: true,
  layout: {
    padding: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      drawBorder: false,
      ticks: {
        display: true,
        autoSkip: true,
        padding: 10,
        maxTicksLimit: 12,
        drawOnChartArea: false
        // fontColor: '#C0C0C0'

      },
      gridLines: {
        drawTicks: false,
        tickMarkLength: 0,
        maxTicksLimit: 14,
        // drawOnChartArea: true,
        color: "rgba(0, 0, 0, 0.03)",
        drawBorder: false,
        display: true,

      }
    }],
    yAxes: [{
      position: 'right',
      drawBorder: false,
      ticks: {
        display: true,
        drawOnChartArea: false,
        padding: 10,
        autoSkip: true,
        color: "rgba(0, 0, 0, 0.03)",
        maxTicksLimit: 9,
        // fontColor: '#C0C0C0',
        drawBorder: false,
        callback: function(value, index, values) {
          return millify(value, {
            precision: 2,
            lowercase: false,
          })
        }
      },
      gridLines: {
        drawTicks: false,
        tickMarkLength: 1,
        // drawOnChartArea: true,
        color: "rgba(0, 0, 0, 0.05)",
        drawBorder: false,
        display: true,

      },
    }],
  }

}

export const countries = {
  "AD": "Andorra",
  "AE": "United Arab Emirates",
  "AF": "Afghanistan",
  "AG": "Antigua and Barbuda",
  "AI": "Anguilla",
  "AL": "Albania",
  "AM": "Armenia",
  "AO": "Angola",
  "AQ": "Antarctica",
  "AR": "Argentina",
  "AS": "American Samoa",
  "AT": "Austria",
  "AU": "Australia",
  "AW": "Aruba",
  "AX": "Alland Islands",
  "AZ": "Azerbaijan",
  "BA": "Bosnia and Herzegovina",
  "BB": "Barbados",
  "BD": "Bangladesh",
  "BE": "Belgium",
  "BF": "Burkina Faso",
  "BG": "Bulgaria",
  "BH": "Bahrain",
  "BI": "Burundi",
  "BJ": "Benin",
  "BL": "Saint Barthelemy",
  "BM": "Bermuda",
  "BN": "Brunei Darussalam",
  "BO": "Bolivia",
  "BR": "Brazil",
  "BS": "Bahamas",
  "BT": "Bhutan",
  "BV": "Bouvet Island",
  "BW": "Botswana",
  "BY": "Belarus",
  "BZ": "Belize",
  "CA": "Canada",
  "CC": "Cocos (Keeling) Islands",
  "CD": "Congo, Democratic Republic of the",
  "CF": "Central African Republic",
  "CG": "Congo, Republic of the",
  "CH": "Switzerland",
  "CI": "Cote d'Ivoire",
  "CK": "Cook Islands",
  "CL": "Chile",
  "CM": "Cameroon",
  "CN": "China",
  "CO": "Colombia",
  "CR": "Costa Rica",
  "CU": "Cuba",
  "CV": "Cape Verde",
  "CW": "Curacao",
  "CX": "Christmas Island",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DE": "Germany",
  "DJ": "Djibouti",
  "DK": "Denmark",
  "DM": "Dominica",
  "DO": "Dominican Republic",
  "DZ": "Algeria",
  "EC": "Ecuador",
  "EE": "Estonia",
  "EG": "Egypt",
  "EH": "Western Sahara",
  "ER": "Eritrea",
  "ES": "Spain",
  "ET": "Ethiopia",
  "FI": "Finland",
  "FJ": "Fiji",
  "FK": "Falkland Islands (Malvinas)",
  "FM": "Micronesia, Federated States of",
  "FO": "Faroe Islands",
  "FR": "France",
  "GA": "Gabon",
  "GB": "United Kingdom",
  "GD": "Grenada",
  "GE": "Georgia",
  "GF": "French Guiana",
  "GG": "Guernsey",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GL": "Greenland",
  "GM": "Gambia",
  "GN": "Guinea",
  "GP": "Guadeloupe",
  "GQ": "Equatorial Guinea",
  "GR": "Greece",
  "GS": "South Georgia and the South Sandwich Islands",
  "GT": "Guatemala",
  "GU": "Guam",
  "GW": "Guinea-Bissau",
  "GY": "Guyana",
  "HK": "Hong Kong",
  "HM": "Heard Island and McDonald Islands",
  "HN": "Honduras",
  "HR": "Croatia",
  "HT": "Haiti",
  "HU": "Hungary",
  "ID": "Indonesia",
  "IE": "Ireland",
  "IL": "Israel",
  "IM": "Isle of Man",
  "IN": "India",
  "IO": "British Indian Ocean Territory",
  "IQ": "Iraq",
  "IR": "Iran, Islamic Republic of",
  "IS": "Iceland",
  "IT": "Italy",
  "JE": "Jersey",
  "JM": "Jamaica",
  "JO": "Jordan",
  "JP": "Japan",
  "KE": "Kenya",
  "KG": "Kyrgyzstan",
  "KH": "Cambodia",
  "KI": "Kiribati",
  "KM": "Comoros",
  "KN": "Saint Kitts and Nevis",
  "KP": "Korea, Democratic People's Republic of",
  "KR": "Korea, Republic of",
  "KW": "Kuwait",
  "KY": "Cayman Islands",
  "KZ": "Kazakhstan",
  "LA": "Lao People's Democratic Republic",
  "LB": "Lebanon",
  "LC": "Saint Lucia",
  "LI": "Liechtenstein",
  "LK": "Sri Lanka",
  "LR": "Liberia",
  "LS": "Lesotho",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "LV": "Latvia",
  "LY": "Libya",
  "MA": "Morocco",
  "MC": "Monaco",
  "MD": "Moldova, Republic of",
  "ME": "Montenegro",
  "MF": "Saint Martin (French part)",
  "MG": "Madagascar",
  "MH": "Marshall Islands",
  "MK": "Macedonia, the Former Yugoslav Republic of",
  "ML": "Mali",
  "MM": "Myanmar",
  "MN": "Mongolia",
  "MO": "Macao",
  "MP": "Northern Mariana Islands",
  "MQ": "Martinique",
  "MR": "Mauritania",
  "MS": "Montserrat",
  "MT": "Malta",
  "MU": "Mauritius",
  "MV": "Maldives",
  "MW": "Malawi",
  "MX": "Mexico",
  "MY": "Malaysia",
  "MZ": "Mozambique",
  "NA": "Namibia",
  "NC": "New Caledonia",
  "NE": "Niger",
  "NF": "Norfolk Island",
  "NG": "Nigeria",
  "NI": "Nicaragua",
  "NL": "Netherlands",
  "NO": "Norway",
  "NP": "Nepal",
  "NR": "Nauru",
  "NU": "Niue",
  "NZ": "New Zealand",
  "OM": "Oman",
  "PA": "Panama",
  "PE": "Peru",
  "PF": "French Polynesia",
  "PG": "Papua New Guinea",
  "PH": "Philippines",
  "PK": "Pakistan",
  "PL": "Poland",
  "PM": "Saint Pierre and Miquelon",
  "PN": "Pitcairn",
  "PR": "Puerto Rico",
  "PS": "Palestine, State of",
  "PT": "Portugal",
  "PW": "Palau",
  "PY": "Paraguay",
  "QA": "Qatar",
  "RE": "Reunion",
  "RO": "Romania",
  "RS": "Serbia",
  "RU": "Russian Federation",
  "RW": "Rwanda",
  "SA": "Saudi Arabia",
  "SB": "Solomon Islands",
  "SC": "Seychelles",
  "SD": "Sudan",
  "SE": "Sweden",
  "SG": "Singapore",
  "SH": "Saint Helena",
  "SI": "Slovenia",
  "SJ": "Svalbard and Jan Mayen",
  "SK": "Slovakia",
  "SL": "Sierra Leone",
  "SM": "San Marino",
  "SN": "Senegal",
  "SO": "Somalia",
  "SR": "Suriname",
  "SS": "South Sudan",
  "ST": "Sao Tome and Principe",
  "SV": "El Salvador",
  "SX": "Sint Maarten (Dutch part)",
  "SY": "Syrian Arab Republic",
  "SZ": "Swaziland",
  "TC": "Turks and Caicos Islands",
  "TD": "Chad",
  "TF": "French Southern Territories",
  "TG": "Togo",
  "TH": "Thailand",
  "TJ": "Tajikistan",
  "TK": "Tokelau",
  "TL": "Timor-Leste",
  "TM": "Turkmenistan",
  "TN": "Tunisia",
  "TO": "Tonga",
  "TR": "Turkey",
  "TT": "Trinidad and Tobago",
  "TV": "Tuvalu",
  "TW": "Taiwan, Province of China",
  "TZ": "United Republic of Tanzania",
  "UA": "Ukraine",
  "UG": "Uganda",
  "US": "United States",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VA": "Holy See (Vatican City State)",
  "VC": "Saint Vincent and the Grenadines",
  "VE": "Venezuela",
  "VG": "British Virgin Islands",
  "VI": "US Virgin Islands",
  "VN": "Vietnam",
  "VU": "Vanuatu",
  "WF": "Wallis and Futuna",
  "WS": "Samoa",
  "XK": "Kosovo",
  "YE": "Yemen",
  "YT": "Mayotte",
  "ZA": "South Africa",
  "ZM": "Zambia",
  "ZW": "Zimbabwe"
}

export const indicators = {
  "SP.DYN.TFRT.IN": "Fertility Rate",
  "SP.POP.TOTL": "Population",
  "SM.POP.NETM": "Net Migration",
  "SL.EMP.WORK.ZS": "% of Employment",
  "NY.GDP.MKTP.CD": "GDP",
  "SP.DYN.IMRT.IN": "Infant Mortality Rate per 1000 live births",
  "SP.DYN.CONU.ZS": "Contraceptive prevalence, any methods (% of women ages 15-49)",
  "SP.DYN.CBRT.IN": "Birth rate, crude (per 1,000 people)",
  "SP.DYN.CDRT.IN": "Death rate, crude (per 1,000 people)",
  "SP.DYN.LE00.IN": "Life expectancy at birth, total (years)",
  "SP.POP.TOTL.FE.ZS": "Population, female (% of total population)",
  "SP.POP.TOTL.MA.ZS": "Population, male (% of total population)",
  "SP.POP.DPND": "Age dependency ratio (% of working-age population)",
  "SM.POP.TOTL": "International migrant stock, total",
  "SP.POP.TOTL.MA.IN": "Population, male",
  "SP.POP.TOTL.FE.IN": "Population, female"

}


export const indicatorsPretty = {
  "SP.DYN.TFRT.IN": {name: "Fertility rate, total (births per woman)", prettyName: "Fertility Rate", popularity: 10, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SM.POP.NETM", "NY.GDP.MKTP.CD"]},
  "SP.POP.TOTL": {name: "Population, total", prettyName: "Population", popularity: 8, category: "Demographic", relatedIndicators: ["SP.DYN.TFRT.IN", "SP.DYN.CBRT.IN", "SP.DYN.IMRT.IN"]},
}

export const generatedIndicatorsAI = {


  "SP.RUR.TOTL.ZS": {name: "Rural population (% of total population)", prettyName: "Rural Population", popularity: 5, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.URB.TOTL.IN.ZS", "SP.POP.GROW"]},
  "SP.URB.TOTL.IN.ZS": {name: "Urban population (% of total population)", prettyName: "Urban Population", popularity: 5, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.RUR.TOTL.ZS", "SP.POP.GROW"]},
  "SP.POP.GROW": {name: "Population growth (annual %)", prettyName: "Population Growth", popularity: 7, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.URB.TOTL.IN.ZS", "SP.RUR.TOTL.ZS"]},
  "SP.POP.0014.TO.ZS": {name: "Population ages 0-14 (% of total population)", prettyName: "Population Ages 0-14", popularity: 6, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.DYN.TFRT.IN", "SP.POP.1564.TO.ZS"]},
  "SP.POP.1564.TO.ZS": {name: "Population ages 15-64 (% of total population)", prettyName: "Population Ages 15-64", popularity: 8, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.DYN.TFRT.IN", "SP.POP.0014.TO.ZS"]},
  "SP.POP.65UP.TO.ZS": {name: "Population ages 65 and above (% of total population)", prettyName: "Population Ages 65 and Up", popularity: 4, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.DYN.TFRT.IN", "SP.POP.1564.TO.ZS"]},
  "SP.DYN.CBRT.IN": {name: "Birth rate, crude (per 1,000 people)", prettyName: "Birth Rate", popularity: 9, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.DYN.TFRT.IN", "SP.DYN.IMRT.IN"]},
  "SP.DYN.IMRT.IN": {name: "Mortality rate, infant (per 1,000 live births)", prettyName: "Infant Mortality Rate", popularity: 7, category: "Demographic", relatedIndicators: ["SP.POP.TOTL", "SP.DYN.CBRT.IN", "SP.DYN.TFRT.IN"]},
  "SP.DYN.AMRT.FE": {name: "Mortality rate, adult, female (per 1,000 female adults)", prettyName: "Adult Female Mortality Rate", popularity: 6, category: "Demographic", relatedIndicators: ["SP.DYN.CBRT.IN", "SP.DYN.TFRT.IN", "SP.DYN.AMRT.MA"]},
  "SP.DYN.AMRT.MA": {name: "Mortality rate, adult, male (per 1,000 male adults)", prettyName: "Adult Male Mortality Rate", popularity: 6, category: "Demographic", relatedIndicators: ["SP.DYN.CBRT.IN", "SP.DYN.TFRT.IN", "SP.DYN.AMRT.FE"]}

}

export const moreindicatorsAIGenerated = {


  "SP.POP.TOTL": {
    name: "Population, total",
    prettyName: "Population",
    popularity: 8,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.TFRT.IN", "SP.DYN.CBRT.IN", "SP.DYN.IMRT.IN"]
  },
  "EN.POP.DNST": {
    name: "Population density (people per sq. km of land area)",
    prettyName: "Population Density",
    popularity: 5,
    category: "Demographic",
    relatedIndicators: ["EN.POP.SLUM.UR.ZS", "SP.RUR.TOTL.ZS", "SP.URB.TOTL.IN.ZS"]
  },
  "SP.RUR.TOTL.ZS": {
    name: "Rural population (% of total population)",
    prettyName: "Rural Population %",
    popularity: 2,
    category: "Demographic",
    relatedIndicators: ["SP.URB.TOTL.IN.ZS", "SP.RUR.TOTL.ZS", "SP.DYN.LE00.IN"]
  },
  "SP.URB.TOTL.IN.ZS": {
    name: "Urban population (% of total)",
    prettyName: "Urban Population %",
    popularity: 7,
    category: "Demographic",
    relatedIndicators: ["SP.URB.TOTL.IN.ZS", "EN.URB.LCTY.UR.ZS", "SP.RUR.TOTL.ZS"]
  },
  " SP.DYN.CBRT.IN": {
    name: "Birth rate, crude (per 1,000 people)",
    prettyName: "Birth Rate",
    popularity: 9,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.CBRT.IN", "SP.DYN.TFRT.IN", "SP.DYN.CDRT.IN"]
  },
  "SP.DYN.CDRT.IN": {
    name: "Death rate, crude (per 1,000 people)",
    prettyName: "Death Rate",
    popularity: 1,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.CDRT.IN", "SP.DYN.TFRT.IN", "SP.DYN.CBRT.IN"]
  },
  "SP.DYN.IMRT.IN": {
    name: "Infant mortality rate (per 1,000 live births)",
    prettyName: "Infant Mortality Rate",
    popularity: 6,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.IMRT.IN", "SP.DYN.CBRT.IN", "SH.DYN.IMRT"]
  },
  "SH.DYN.IMRT": {
    name: "Maternal mortality ratio (modeled estimate, per 100,000 live births)",
    prettyName: "Maternal Mortality Ratio",
    popularity: 3,
    category: "Demographic",
    relatedIndicators: ["SH.DYN.IMRT", "SP.DYN.IMRT.IN", "SH.STA.MMRT"]
  },
  "SH.STA.MMRT": {
    name: "Maternal mortality rate (modeled estimate, per 100,000 live births)",
    prettyName: "Maternal Mortality Rate",
    popularity: 4,
    category: "Demographic",
    relatedIndicators: ["SH.STA.MMRT", "SH.DYN.IMRT", "SP.DYN.IMRT.IN"]
  },
  "SP.POP.GROW": {
    name: "Population growth (annual %)",
    prettyName: "Population Growth",
    popularity: 10,
    category: "Demographic",
    relatedIndicators: ["SP.POP.TOTL", "SP.POP.GROW", "EN.POP.DNST"]
  },
  "EN.POP.SLUM.UR.ZS": {
    name: "Urban population living in slums (% of urban population)",
    prettyName: "Urban Population in Slums %",
    popularity: 5,
    category: "Demographic",
    relatedIndicators: ["SP.RUR.TOTL.ZS", "EN.POP.SLUM.UR.ZS", "SP.URB.TOTL.IN.ZS"]
  },
  "SP.RUR.TOTL": {
    name: "Rural population",
    prettyName: "Rural Population",
    popularity: 2,
    category: "Demographic",
    relatedIndicators: ["SP.URB.TOTL.IN.ZS", "SP.RUR.TOTL.ZS", "SP.DYN.LE00.IN"]
  },
  "SP.URB.TOTL": {
    name: "Urban population",
    prettyName: "Urban Population",
    popularity: 7,
    category: "Demographic",
    relatedIndicators: ["SP.URB.TOTL.IN.ZS", "EN.URB.LCTY.UR.ZS", "SP.RUR.TOTL.ZS"]
  },
  "SP.DYN.TFRT.IN": {
    name: "Fertility rate, total (births per woman)",
    prettyName: "Fertility Rate",
    popularity: 10,
    category: "Demographic",
    relatedIndicators: ["SP.POP.TOTL", "SM.POP.NETM", "NY.GDP.MKTP.CD"]
  },
  "SP.POP.1564.TO.ZS": {
    name: "Population ages 15-64 (% of total population)",
    prettyName: "Population Ages 15-64 %",
    popularity: 8,
    category: "Demographic",
    relatedIndicators: ["SP.POP.1564.TO.ZS", "SP.POP.65UP.TO.ZS", "SP.POP.TOTL"]
  },
  "SP.POP.65UP.TO.ZS": {
    name: "Population ages 65 and above (% of total population)",
    prettyName: "Population Ages 65+ %",
    popularity: 3,
    category: "Demographic",
    relatedIndicators: ["SP.POP.65UP.TO.ZS", "SP.POP.1564.TO.ZS", "SP.POP.TOTL"]
  },
  "SP.POP. dependency": {
    name: "Age dependency ratio (% of working-age population)",
    prettyName: "Age Dependency Ratio",
    popularity: 6,
    category: "Demographic",
    relatedIndicators: ["SP.POP. dependency", "SP.POP.1564.TO.ZS", "SP.POP.65UP.TO.ZS"]
  },
  "SP.POP. youth": {
    name: "Youth dependency ratio (% of working-age population)",
    prettyName: "Youth Dependency Ratio",
    popularity: 7,
    category: "Demographic",
    relatedIndicators: ["SP.POP. youth", "SP.POP.1564.TO.ZS", "SP.POP.0014.TO.ZS"]
  },
  "SP.POP. elderly": {
    name: "Elderly dependency ratio (% of working-age population)",
    prettyName: "Elderly Dependency Ratio",
    popularity: 4,
    category: "Demographic",
    relatedIndicators: ["SP.POP. elderly", "SP.POP.1564.TO.ZS", "SP.POP.65UP.TO.ZS"]
  },
  "SP.POP. total dependency": {
    name: "Total dependency ratio (% of relevant age group)",
    prettyName: "Total Dependency Ratio",
    popularity: 9,
    category: "Demographic",
    relatedIndicators: ["SP.POP. total dependency", "SP.POP.1564.TO.ZS", "SP.POP.0014.TO.ZS", "SP.POP.65UP.TO.ZS"]
  },
  "SP.POP.0014.TO.ZS": {
    name: "Population ages 0-14 (% of total population)",
    prettyName: "Population Ages 0-14 %",
    popularity: 5,
    category: "Demographic",
    relatedIndicators: ["SP.POP.0014.TO.ZS", "SP.POP.1564.TO.ZS", "SP.POP.TOTL"]
  },
  "SP.DYN.LE00.IN": {
    name: "Life expectancy at birth, total (years)",
    prettyName: "Life Expectancy at Birth",
    popularity: 1,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.LE00.IN", "SP.DYN.CDRT.IN", "SP.DYN.AMRT.FE"]
  },
  "SP.DYN.AMRT.FE": {
    name: "Life expectancy at birth, female (years)",
    prettyName: "Life Expectancy at Birth, Female",
    popularity: 2,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.AMRT.FE", "SP.DYN.LE00.IN", "SP.DYN.AMRT.MA"]
  },
  "SP.DYN.AMRT.MA": {
    name: "Life expectancy at birth, male (years)",
    prettyName: "Life Expectancy at Birth, Male",
    popularity: 3,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.AMRT.MA", "SP.DYN.LE00.IN", "SP.DYN.AMRT.FE"]
  },
  "SP.DYN.CONU.ZS": {
    name: "Contraceptive prevalence, any methods (% of women ages 15-49)",
    prettyName: "Contraceptive Prevalence %",
    popularity: 4,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.CONU.ZS", "SP.DYN.TFRT.IN", "SP.RUR.TOTL.ZS"]
  },
  "SP.MTR.1524.ZS": {
    name: "Maternal mortality ratio (modeled estimate, per 100,000 live births)",
    prettyName: "Maternal Mortality Ratio",
    popularity: 5,
    category: "Demographic",
    relatedIndicators: ["SP.MTR.1524.ZS", "SP.DYN.IMRT.IN", "SH.STA.MMRT"]
  },
  "SP.RUR.TFRT": {
    name: "Fertility rate, total (births per woman)",
    prettyName: "Fertility Rate",
    popularity: 7,
    category: "Demographic",
    relatedIndicators: ["SP.RUR.TFRT", "SP.URB.TFRT", "SP.DYN.TFRT.IN"]
  },
  "SP.URB.TFRT": {
    name: "Fertility rate, urban (births per woman)",
    prettyName: "Urban Fertility Rate",
    popularity: 8,
    category: "Demographic",
    relatedIndicators: ["SP.URB.TFRT", "SP.RUR.TFRT", "SP.DYN.TFRT.IN"]
  },
  "SP.DYN.LBRF.IN": {
    name: "Labor force participation rate, female (% of female population ages 15+) (modeled ILO estimate)",
    prettyName: "Labor Force Participation Rate, Female",
    popularity: 9,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.LBRF.IN", "SP.DYN.CBRT.IN", "SP.DYN.LBRF.MA.ZS"]
  },
  "SP.DYN.LBRF.MA.ZS": {
    name: "Labor force participation rate, male (% of male population ages 15+) (modeled ILO estimate)",
    prettyName: "Labor Force Participation Rate, Male",
    popularity: 10,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.LBRF.MA.ZS", "SP.DYN.LBRF.IN", "SP.DYN.LFPR.FE.ZS"]
  },
  "SP.DYN.LFPR.FE.ZS": {
    name: "Labor force participation rate, female (% of female population ages 15+) (modeled ILO estimate)",
    prettyName: "Labor Force Participation Rate, Female",
    popularity: 1,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.LFPR.FE.ZS", "SP.DYN.LBRF.MA.ZS", "SP.DYN.LFPR.MA.ZS"]
  },
  "SP.DYN.LFPR.MA.ZS": {
    name: "Labor force participation rate, male (% of male population ages 15+) (modeled ILO estimate)",
    prettyName: "Labor Force Participation Rate, Male",
    popularity: 2,
    category: "Demographic",
    relatedIndicators: ["SP.DYN.LFPR.MA.ZS", "SP.DYN.LFPR.FE.ZS", "SP.DYN.LBRF.IN"]
  },
  "SL.TLF.CACT.FE.ZS": {
    name: "Labor force participation rate, female (% of female population ages 15+) (modeled ILO estimate)",
    prettyName: "Labor Force Participation Rate, Female",
    popularity: 3,
    category: "Demographic",
    relatedIndicators: ["SL.TLF.CACT.FE.ZS", "SP.DYN.LBRF.IN", "SP.DYN.LFPR.FE.ZS"]
  },
  "SL.TLF.CACT.MA.ZS": {
    name: "Labor force participation rate, male (% of male population ages 15+) (modeled ILO estimate)",
    prettyName: "Labor Force Participation Rate, Male",
    popularity: 4,
    category: "Demographic",
    relatedIndicators: ["SL.TLF.CACT.MA.ZS", "SP.DYN.LFPR.MA.ZS", "SP.DYN.LBRF.MA.ZS"]
  },
  "SP.URB.GROW": {
    name: "Urban population growth (annual %)",
    prettyName: "Urban Population Growth",
    popularity: 5,
    category: "Demographic",
    relatedIndicators: ["SP.URB.GROW", "SP.URB.TOTL", "SP.URB.TOTL.IN.ZS"]
  },
}