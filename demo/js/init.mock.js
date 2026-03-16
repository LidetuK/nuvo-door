// init.mock.js — Firebase-free initializer for local UI development
import { UUID_STORAGE_KEY, METRICS_MAP } from "./constants.js";
import { fetchConstants } from "./services/fetch-constants.mock.js";
import { generateUUIDv4 } from "./generators.js";
import { stateMachineClass } from "./state-machine.js";
import { retrieveFromStorage, storeInStorage } from "./use-storage.js";
import { createVisitorSession, getVisitorSession } from "./services/visitor-session.mock.js";
import { logMetric } from "./services/metrics.mock.js";

export async function initializeStateMachine() {
  console.log("[MOCK] Initializing Machine ...");
  try {
    const { UUID, visitorSession, resetMachine } = await initializeUserSession();
    const config = await initializeConfig();

    const stateMachine = new stateMachineClass({ config, visitorSession, UUID });
    if (resetMachine === true) {
      stateMachine.reset();
      console.log("[MOCK] State Machine reset due to corrupted session.");
    }
    return stateMachine;
  } catch (err) {
    console.log("[MOCK] Error initializing machine:", err);
    return null;
  }
}

export async function initializeUserSession() {
  try {
    let UUID = retrieveFromStorage(UUID_STORAGE_KEY);
    let session = null;

    if (UUID == null) {
      console.log("[MOCK] No session found. Creating one ...");
      UUID = generateUUIDv4();
      await createVisitorSession(UUID);
      session = await getVisitorSession(UUID);
      storeInStorage(UUID_STORAGE_KEY, UUID);
      await logMetric(METRICS_MAP.VISITORS);
      return { UUID, visitorSession: session, resetMachine: false };
    }

    session = await getVisitorSession(UUID);
    if (session != null) {
      console.log("[MOCK] Session found:", UUID, session);
      return { UUID, visitorSession: session, resetMachine: false };
    }

    // session corrupted — recreate
    console.log("[MOCK] Session corrupted. Recreating ...");
    UUID = generateUUIDv4();
    await createVisitorSession(UUID);
    session = await getVisitorSession(UUID);
    storeInStorage(UUID_STORAGE_KEY, UUID);
    await logMetric(METRICS_MAP.VISITORS);
    return { UUID, visitorSession: session, resetMachine: true };

  } catch (err) {
    console.log("[MOCK] Error initializing user session:", err);
    return null;
  }
}

export async function initializeConfig() {
  try {
    const config = await fetchConstants();
    console.log("[MOCK] Using config:", config);
    return config;
  } catch (err) {
    console.log("[MOCK] Error initializing config:", err);
    return null;
  }
}
