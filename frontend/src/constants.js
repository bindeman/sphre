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
export const GRAPH_LINE_WIDTH_THICK = 6;
export const GRAPH_LINE_WIDTH_MED = 5;
export const GRAPH_LINE_WIDTH_THIN = 3;
export const GRAPH_LINE_WIDTH_EXTRA_THIN = 2;
export const GRAPH_LINE_WIDTH_ULTRA_THIN = 1.5;



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
    {background: "rgba(155, 155, 155, 0.20)", clear: "rgba(155, 155, 155, 0.00)", line: "rgba(155, 155, 155)"},
];


export const graphOptions = {
  scales: {
    x: {
      type: 'linear',
    }
  },
  plugins: {
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