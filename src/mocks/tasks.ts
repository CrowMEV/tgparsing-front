export enum Status {
  inProcess = 'В процессе',
  Error = 'Ошибка',
}

export type Task = {
  id: string;
  creationDate: string;
  startDate: string;
  title: string;
  operation: string;
  status: Status;
};

export const tasks: Task[] = [
  {
    id: '1',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '2',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '3',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '4',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '5',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '6',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '7',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '8',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '9',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '10',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '11',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '12',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '13',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '14',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '15',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },

  {
    id: '16',
    creationDate: '01.01.2024',
    startDate: '01.01.2024',
    title: 'Какое-то название',
    operation: 'Парсинг',
    status: Status.inProcess,
  },
];
