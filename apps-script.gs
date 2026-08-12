/**
 * PLATO-11 — Google Apps Script
 *
 * Writes patient responses to a single "PLATO-11 Responses" tab.
 * Each row = one patient submission.
 *
 * Scoring reference (for columns A1–A8 and B1–B2):
 *   0 = Never · 1 = Rarely · 2 = Sometimes · 3 = Often · 4 = Always
 *   Section A Total: sum of A1–A8 (range 0–32, higher = worse symptoms)
 *   Section B Total: sum of B1–B2 (range 0–8, higher = worse)
 *   Sleep Quality:   0–10 (higher = better — NOTE: inverted direction)
 *
 * Deploy as Web App: Execute as Me, Who has access: Anyone
 */

var TAB_NAME = 'PLATO-11 Responses';

var HEADERS = [
  'Timestamp', 'First Name', 'Last Name',
  // Section A — scores (0–4)
  'A1 Score', 'A1 Label',
  'A2 Score', 'A2 Label',
  'A3 Score', 'A3 Label',
  'A4 Score', 'A4 Label',
  'A5 Score', 'A5 Label',
  'A6 Score', 'A6 Label',
  'A7 Score', 'A7 Label',
  'A8 Score', 'A8 Label',
  'Section A Total (0–32)',
  // Section B — scores (0–4)
  'B1 Score', 'B1 Label',
  'B2 Score', 'B2 Label',
  'Section B Total (0–8)',
  // Section C — sleep quality (0–10, higher = better)
  'Sleep Quality (0–10)'
];

function doPost(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(10000);
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(TAB_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(TAB_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var d = JSON.parse(e.postData.contents);

    sheet.appendRow([
      d.timestamp,
      d.first_name,
      d.last_name,
      d.a1_score, d.a1_label,
      d.a2_score, d.a2_label,
      d.a3_score, d.a3_label,
      d.a4_score, d.a4_label,
      d.a5_score, d.a5_label,
      d.a6_score, d.a6_label,
      d.a7_score, d.a7_label,
      d.a8_score, d.a8_label,
      d.section_a_total,
      d.b1_score, d.b1_label,
      d.b2_score, d.b2_label,
      d.section_b_total,
      d.sleep_quality
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ready', message: 'PLATO-11 collector is active.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
