import { UsersFilter } from './filters';

export const updateFilterReducer = (
  filters: UsersFilter[],
  action: { filter: UsersFilter },
) => {
  return filters.map((filter) => {
    if (filter.name === action.filter.name) {
      return action.filter;
    } else {
      return filter;
    }
  });
};
