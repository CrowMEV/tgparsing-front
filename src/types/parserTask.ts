export type Operations = 'parsing';
export type WorkStatus = 'in_processing' | 'in_waiting' | 'failed' | 'success';

export type ParserTask = {
  id: number;
  created_at: string;
  job_start: string;
  job_finish: string;
  time_work: string;
  title: string;
  operation: Operations;
  work_status: WorkStatus;
  data_count: number;
  favorite: boolean;
};
