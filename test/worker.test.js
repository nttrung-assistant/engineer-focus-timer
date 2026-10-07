import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

const BASE = "https://engineer-focus-timer.example.workers.dev";

test("GET / serves the app shell", async () => {
  const res = await worker.fetch(new Request(BASE + "/"));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  const html = await res.text();
  assert.match(html, /<title>Focus — a quiet pomodoro timer<\/title>/);
  assert.match(html, /id="time"/);
  assert.match(html, /id="ring"/);
  assert.match(html, /name="viewport"/);
  assert.doesNotMatch(html, /\bundefined\b/); // guard against template bugs
});

test("GET /healthz reports ok as JSON", async () => {
  const res = await worker.fetch(new Request(BASE + "/healthz"));
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /application\/json/);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.app, "engineer-focus-timer");
  assert.ok(!Number.isNaN(Date.parse(body.time)));
});

test("unknown paths return a JSON 404", async () => {
  const res = await worker.fetch(new Request(BASE + "/nope"));
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.equal(body.error, "not_found");
});

test("non-GET requests are not served the app shell", async () => {
  const res = await worker.fetch(new Request(BASE + "/", { method: "POST" }));
  assert.equal(res.status, 404);
});
