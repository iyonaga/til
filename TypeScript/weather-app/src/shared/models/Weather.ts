// export default class Weather {
//   public coord: {
//     lon: number;
//     lat: number
//   };
//   public weather: Array<{
//     id: number;
//     main: string;
//     description: string;
//     icon: string;
//   }>;
//   public base: string;
//   public main: {
//     temp: number;
//     pressure: number;
//     humidity: number;
//     temp_min: number;
//     temp_max: number;
//     sea_level: number;
//     grnd_level: number;
//   };
//   public wind: {
//     speed: number;
//     deg: number;
//   };
//   public clouds: {
//     all: number;
//   };
//   public dt: number;
//   public sys: {
//     message: number;
//     country: string;
//     sunrise: number;
//     sunset: number;
//   };
//   public id: number;
//   public name: string;
//   public cod: number

//   constructor(args?: {}) {
//     Object.assign(this, args);
//   }
// }


export default interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
}
