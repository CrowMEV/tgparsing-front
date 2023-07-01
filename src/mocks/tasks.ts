export enum Status {
  inProcess = 'В процессе',
  Error = 'Ошибка',
}

export type Task = {
  id: string;
  date: string;
  title: string;
  status: Status;
};

export const tasks: Task[] = [
  {
    id: '1',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '2',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '3',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '4',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '5',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '6',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '7',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '4',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '5',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '6',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '7',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '8',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '9',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '10',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '11',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },

  {
    id: '12',
    date: '01.01.2024',
    title: 'Какое-то название',
    status: Status.inProcess,
  },
];
