// ============================================================
// firebase.mock.js — Local dev mock, NO real Firebase needed
// ============================================================
// Drop-in replacement for firebase.js when working offline.
// All Firestore reads return sensible defaults; writes are no-ops.
// ============================================================

export const db = {}; // fake db object — never actually used below
