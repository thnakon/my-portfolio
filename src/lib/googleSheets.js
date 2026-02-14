// Google Sheets API helper
// This module handles sending and fetching data to/from Google Sheets via Google Apps Script Web App

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
                action: 'append',
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

export async function deleteFromSheet(sheetName, id) {
    if (!GOOGLE_SCRIPT_URL) {
        console.warn('GOOGLE_SCRIPT_URL not configured. Cannot delete.');
        return { success: false };
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                sheet: sheetName,
                id: id,
            }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error('Failed to delete from Google Sheets');
        }
    } catch (error) {
        console.error('Google Sheets Delete Error:', error);
        throw error;
    }
}

export async function fetchFromSheet(sheetName) {
    if (!GOOGLE_SCRIPT_URL) {
        console.warn('GOOGLE_SCRIPT_URL not configured. Returning empty data.');
        return [];
    }

    try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=read&sheet=${sheetName}`);
        if (response.ok) {
            const result = await response.json();
            return result.data || [];
        } else {
            throw new Error('Failed to fetch from Google Sheets');
        }
    } catch (error) {
        console.error('Google Sheets Fetch Error:', error);
        return [];
    }
}

/*
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code:
 * 
 * function doGet(e) {
 *   var action = e.parameter.action;
 *   var sheetName = e.parameter.sheet;
 *   var ss = SpreadsheetApp.getActiveSpreadsheet();
 *   var sheet = ss.getSheetByName(sheetName);
 *   
 *   if (action === 'read' && sheet) {
 *     var data = sheet.getDataRange().getValues();
 *     var headers = data[0];
 *     var rows = data.slice(1);
 *     
 *     var jsonData = rows.map(function(row) {
 *       var obj = {};
 *       headers.forEach(function(header, i) {
 *         obj[header] = row[i];
 *       });
 *       return obj;
 *     });
 *     
 *     return ContentService.createTextOutput(JSON.stringify({data: jsonData}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 *   return ContentService.createTextOutput(JSON.stringify({error: 'Invalid request'}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * function doPost(e) {
 *   var ss = SpreadsheetApp.getActiveSpreadsheet();
 *   var payload = JSON.parse(e.postData.contents);
 *   var sheetName = payload.sheet;
 *   var data = payload.data;
 *   
 *   var sheet = ss.getSheetByName(sheetName);
 *   if (!sheet) {
 *     sheet = ss.insertSheet(sheetName);
 *     // Set headers based on keys
 *     var headers = ['Timestamp', ...Object.keys(data)];
 *     sheet.appendRow(headers);
 *     sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
 *   }
 *   
 *   var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
 *   var rowData = headers.map(function(header) {
 *     if (header === 'Timestamp') return new Date();
 *     return data[header] || '';
 *   });
 *   
 *   sheet.appendRow(rowData);
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
