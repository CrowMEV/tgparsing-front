import { ParserTask } from '../types/tasks';

export const tasks: ParserTask[] = [
  {
    id: 1,
    created_at: '2023-08-01T12:45:34.850Z',
    job_start: '2023-08-01T12:45:34.850Z',
    job_finish: '2023-08-01T12:45:34.850Z',
    time_work: '12:45:34.850Z',
    title: 'Какое-то название',
    operation: 'parsing',
    data_count: 0,
    work_status: 'in_processing',
    favorite: false,
  },
  {
    id: 2,
    created_at: '2023-08-01T12:45:34.850Z',
    job_start: '2023-08-01T12:45:34.850Z',
    job_finish: '2023-08-01T12:45:34.850Z',
    time_work: '12:45:34.850Z',
    title: 'Какое-то название',
    operation: 'parsing',
    data_count: 0,
    work_status: 'failed',
    favorite: false,
  },
];
