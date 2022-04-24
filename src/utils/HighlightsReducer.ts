import { DataListProps } from "../screens/Dashboard/Dashboard";

export const HIGHLIGHTS_INITIAL_VALUES = { entries: 0, expenses: 0, total: 0, lastEntryDate: 0, lastExpenseDate: 0, lastTotalDate: 0};

type HighlightsValues = typeof HIGHLIGHTS_INITIAL_VALUES;

export function highlightsReducer(acc: HighlightsValues, current: DataListProps) {
  const dateTime = new Date(current.date).getTime();

  if (current.type === 'withdraw') {
    acc.expenses += Number(current.amount);
    acc.total -= Number(current.amount);
    acc.lastExpenseDate = acc.lastExpenseDate > dateTime ? acc.lastExpenseDate : dateTime;
  } else {
    acc.entries += Number(current.amount);
    acc.total += Number(current.amount);
    acc.lastEntryDate = acc.lastExpenseDate > dateTime ? acc.lastExpenseDate : dateTime;
  }
  acc.lastTotalDate = acc.lastExpenseDate > acc.lastEntryDate ? acc.lastExpenseDate : acc.lastEntryDate;
  return acc;
}