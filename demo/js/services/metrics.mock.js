// metrics.mock.js — no-op metric logger, no Firebase
export async function logMetric(metricName) {
  console.log("[MOCK] logMetric:", metricName);
}
