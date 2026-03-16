// fetch-constants.mock.js — returns hardcoded defaults, no Firebase
import { DEFAULT_STATE_MACHINE_CONFIG_VALUES } from "../constants.js";

export async function fetchConstants() {
  console.log("[MOCK] fetchConstants — returning default config");
  return { ...DEFAULT_STATE_MACHINE_CONFIG_VALUES };
}

export async function decreaseAvailablePortals() {
  console.log("[MOCK] decreaseAvailablePortals — no-op");
}
