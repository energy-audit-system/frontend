// src/data/reports.js
export const reports = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Отчет №${i + 1}`,
  status: i % 2 === 0 ? "done" : "progress",
}));
