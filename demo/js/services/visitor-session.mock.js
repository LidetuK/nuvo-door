// visitor-session.mock.js — localStorage based visitor session, no Firebase
const DEFAULT_SESSION = { demoCompleted: false };
const SESSION_STORAGE_KEY = "mock_visitor_sessions";

function getSessions() {
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function saveSessions(sessions) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
}

export async function getVisitorSession(visitorUUID) {
  console.log("[MOCK] getVisitorSession", visitorUUID);
  const sessions = getSessions();
  return sessions[visitorUUID] ?? null;
}

export async function createVisitorSession(visitorUUID) {
  console.log("[MOCK] createVisitorSession", visitorUUID);
  const sessions = getSessions();
  sessions[visitorUUID] = { ...DEFAULT_SESSION };
  saveSessions(sessions);
  return true;
}

export async function storeVisitorFeedback(visitorUUID, feedback) {
  console.log("[MOCK] storeVisitorFeedback", visitorUUID, feedback);
  const sessions = getSessions();
  if (sessions[visitorUUID]) {
    sessions[visitorUUID].demoCompleted = true;
    sessions[visitorUUID].feedback = feedback;
    saveSessions(sessions);
  }
  return true;
}
