import { ForecastResponse } from '../api/types';

export const dummyForecastData: ForecastResponse = {
    list: [
        {
            dt: Math.floor(Date.now() / 1000),
            main: {
                temp: 22,
                feels_like: 20,
                temp_min: 18,
                temp_max: 25,
                pressure: 1015,
                sea_level: 1015,
                grnd_level: 1013,
                humidity: 65,
                temp_kf: 0
            },
            weather: [
                {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01d"
                }
            ],
            clouds: {
                all: 0
            },
            wind: {
                speed: 3.5,
                deg: 180,
                gust: 4.2
            },
            visibility: 10000,
            pop: 0.1,
            sys: {
                pod: "d"
            },
            dt_txt: new Date().toISOString()
        },
        {
            dt: Math.floor(Date.now() / 1000) + 86400,
            main: {
                temp: 20,
                feels_like: 18,
                temp_min: 16,
                temp_max: 23,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 1011,
                humidity: 70,
                temp_kf: 0
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 75
            },
            wind: {
                speed: 4.2,
                deg: 200,
                gust: 5.5
            },
            visibility: 8000,
            pop: 0.6,
            sys: {
                pod: "d"
            },
            dt_txt: new Date(Date.now() + 86400000).toISOString()
        },
        {
            dt: Math.floor(Date.now() / 1000) + 172800,
            main: {
                temp: 19,
                feels_like: 17,
                temp_min: 15,
                temp_max: 22,
                pressure: 1010,
                sea_level: 1010,
                grnd_level: 1008,
                humidity: 75,
                temp_kf: 0
            },
            weather: [
                {
                    id: 501,
                    main: "Rain",
                    description: "moderate rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 90
            },
            wind: {
                speed: 5.0,
                deg: 220,
                gust: 6.5
            },
            visibility: 6000,
            pop: 0.8,
            sys: {
                pod: "d"
            },
            dt_txt: new Date(Date.now() + 172800000).toISOString()
        },
        {
            dt: Math.floor(Date.now() / 1000) + 259200,
            main: {
                temp: 21,
                feels_like: 19,
                temp_min: 17,
                temp_max: 24,
                pressure: 1012,
                sea_level: 1012,
                grnd_level: 1010,
                humidity: 68,
                temp_kf: 0
            },
            weather: [
                {
                    id: 801,
                    main: "Clouds",
                    description: "few clouds",
                    icon: "02d"
                }
            ],
            clouds: {
                all: 25
            },
            wind: {
                speed: 3.8,
                deg: 190,
                gust: 4.5
            },
            visibility: 10000,
            pop: 0.2,
            sys: {
                pod: "d"
            },
            dt_txt: new Date(Date.now() + 259200000).toISOString()
        },
        {
            dt: Math.floor(Date.now() / 1000) + 345600,
            main: {
                temp: 23,
                feels_like: 21,
                temp_min: 19,
                temp_max: 26,
                pressure: 1014,
                sea_level: 1014,
                grnd_level: 1012,
                humidity: 62,
                temp_kf: 0
            },
            weather: [
                {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01d"
                }
            ],
            clouds: {
                all: 0
            },
            wind: {
                speed: 3.2,
                deg: 170,
                gust: 3.8
            },
            visibility: 10000,
            pop: 0.1,
            sys: {
                pod: "d"
            },
            dt_txt: new Date(Date.now() + 345600000).toISOString()
        }
    ],
    city: {
        id: 5128581,
        name: "New York",
        country: "US",
        population: 8175133,
        timezone: -14400,
        sunrise: Math.floor(Date.now() / 1000) - 3600,
        sunset: Math.floor(Date.now() / 1000) + 3600
    }
}; 