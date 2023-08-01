import { Operation, WorkStatus } from '../types/tasks';

export const getTaskStatusName = (status: WorkStatus) => {
  switch (status) {
    case 'success':
      return 'завершена';
    case 'failed':
      return 'ошибка';
    case 'in_processing':
      return 'в процессе';
    case 'in_waiting':
      return 'в ожидании';
    default:
      return status;
  }
};

export const getTaskOperationName = (operation: Operation) => {
  switch (operation) {
    case 'parsing':
      return 'Парсинг';
    default:
      return operation;
  }
};
