// Google Sheets API helper
// This module handles sending data to Google Sheets via Google Apps Script Web App

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

export async function appendToSheet(sheetName, data) {
    if (!GOOGLE_SCRIPT_URL) {
        console.warn('GOOGLE_SCRIPT_URL not configured. Data will not be saved.');
        return { success: true, message: 'Development mode - data not saved' };
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sheet: sheetName,
                data: data,
            }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error('Failed to save to Google Sheets');
        }
    } catch (error) {
        console.error('Google Sheets Error:', error);
        throw error;
    }
}

/*
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code:
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet();
 *   var data = JSON.parse(e.postData.contents);
 *   
 *   var targetSheet = sheet.getSheetByName(data.sheet);
 *   if (!targetSheet) {
 *     targetSheet = sheet.insertSheet(data.sheet);
 *   }
 *   
 *   var rowData = Object.values(data.data);
 *   targetSheet.appendRow([new Date(), ...rowData]);
 *   
 *   return ContentService.createTextOutput(JSON.stringify({success: true}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 4. Deploy as Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and add to .env.local:
 *    GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 */
