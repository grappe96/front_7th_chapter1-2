export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceRule {
  type: RecurrenceType;
  interval: number; // >= 1
  start: Date;
  until: Date;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

function addMonthsKeepingDay(date: Date, months: number): Date | null {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const target = new Date(year, month + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  if (day > lastDay) {
    return null; // skip months without that day (e.g., 31st)
  }
  return new Date(target.getFullYear(), target.getMonth(), day);
}

function addYearsKeepingMonthDay(date: Date, years: number): Date | null {
  const y = date.getFullYear() + years;
  const m = date.getMonth();
  const d = date.getDate();
  // handle Feb 29 edge case
  if (m === 1 && d === 29 && !isLeapYear(y)) {
    return null; // skip non-leap years
  }
  return new Date(y, m, d);
}

export function computeRecurringDates(rule: RecurrenceRule): Date[] {
  const { type, interval, start, until } = rule;
  if (interval < 1) throw new Error('interval must be >= 1');
  const results: Date[] = [];

  const pushIfInRange = (d: Date | null) => {
    if (!d) return;
    if (d >= start && d <= until) results.push(new Date(d));
  };

  // include start if in range
  pushIfInRange(start);

  let cursor = new Date(start);
  while (true) {
    let next: Date | null;
    if (type === 'daily') {
      next = addDays(cursor, interval);
    } else if (type === 'weekly') {
      next = addWeeks(cursor, interval);
    } else if (type === 'monthly') {
      next = addMonthsKeepingDay(cursor, interval);
    } else {
      next = addYearsKeepingMonthDay(cursor, interval);
    }

    // if skipping (null), advance cursor base by interval until a valid date or beyond until
    if (next === null) {
      // move base forward but keep searching
      if (type === 'monthly') {
        // advance month base
        const tmp = new Date(cursor);
        tmp.setMonth(tmp.getMonth() + interval);
        cursor = tmp;
        // try again in next loop
        continue;
      }
      if (type === 'yearly') {
        const tmp = new Date(cursor);
        tmp.setFullYear(tmp.getFullYear() + interval);
        cursor = tmp;
        continue;
      }
    } else {
      if (next > until) break;
      results.push(new Date(next));
      cursor = next;
    }
  }

  return results;
}
