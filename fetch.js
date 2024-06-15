const CLIENT_ID = '566945190703-2icg1k1svgqdg3rh9f63i3jc1306ih2m.apps.googleusercontent.com';  // OAuth 2.0 クライアントIDを設定
const API_KEY = 'AIzaSyCZnpg9TDD-a8OnIS8SjL476Rd8gZre1m4';      // APIキーを設定
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content = document.getElementById('content');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, (error) => {
        console.error(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        getSpreadsheetData();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function getSpreadsheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1QMjhvVYjDOco7jhZ9hnRx8KyrvOEq5QdC3bB-GSTsU0', // スプレッドシートIDを設定
        range: 'シート1!C4:D15', // 取得する範囲を設定
    }).then((response) => {
        const range = response.result;
        if (range.values.length > 0) {
            let output = '';
            for (let i = 0; i < range.values.length; i++) {
                const row = range.values[i];
                output += row.join(', ') + '\n';
            }
            content.textContent = output;
        } else {
            content.textContent = 'No data found.';
        }
    }, (response) => {
        content.textContent = 'Error: ' + response.result.error.message;
    });
}

document.addEventListener('DOMContentLoaded', handleClientLoad);
