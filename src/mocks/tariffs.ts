enum ParsingMethods {
  Groups = 'участники групп/каналов',
  Activity = 'активность участников групп/каналов',
  Geolocation = 'геолокация',
}

export type Tariff = {
  id: string;
  title: string;
  period: number;
  price: number;
  parsersPerDay: number;
  simultaneousParsing: number;
  parsingMethods: ParsingMethods[];
};

export const tariffs: Tariff[] = [
  {
    id: '1',
    title: 'Стандарт',
    period: 1,
    price: 99,
    parsersPerDay: 5,
    simultaneousParsing: 1,
    parsingMethods: [
      ParsingMethods.Groups,
      ParsingMethods.Activity,
      ParsingMethods.Geolocation,
    ],
  },
];
