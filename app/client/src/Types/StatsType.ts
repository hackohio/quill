export type Stats = {
  lastUpdated: Date;
  total: number;
  demo: {
    gender: { M: number; F: number; B: number; O: number; N: number };
    schools: [];
    majors: [];
    month: {
      January: number;
      Febuary: number;
      March: number;
      April: number;
      May: number;
      June: number;
      July: number;
      August: number;
      September: number;
      October: number;
      November: number;
      December: number;
    };
    year: {
      '2020': number;
      '2021': number;
      '2022': number;
      '2023': number;
      '2024': number;
    };
    degree: {
      Associates: number;
      Bachelors: number;
      Masters: number;
      Doctorate: number;
    };
    teams: {};
    verified: number;
    submitted: number;
    admitted: number;
    confirmed: number;
    confirmedOsu: number;
    declined: number;
    confirmedFemale: number;
    confirmedMale: number;
    confirmedNonBinary: number;
    confirmedOther: number;
    confirmedNone: number;
    shirtSizes: {
      XS: number;
      S: number;
      M: number;
      L: number;
      XL: number;
      XXL: number;
      WXS: number;
      WS: number;
      WM: number;
      WL: number;
      WXL: number;
      WXXL: number;
      None: number;
    };
    dietaryRestrictions: [{ name: string; count: number }];
    wantsHardware: number;
    wantsSwag: number;
    checkedIn: number;
    demoSummary: { baseOff: string; count: number; key: string };
  };
};
