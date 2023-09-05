const express = require('express');
const { google } = require('googleapis');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

    const auth  = new google.auth.GoogleAuth({  
        keyFile: "creds.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client            = await auth.getClient();
    const googleSheets      = google.sheets({version: "v4", auth: client});
    const spreadsheetId     = "18huX3L4DoxKefKarBZitPU6kZ-XKyTU1GF6KPRBdJD8";
    const metadata          = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    });

    // read rows from spreadsheet
    const getRows           = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A1:B5"
    });

    console.log(getRows.data);

    var datapass = {
        "field": getRows.data.values[0],
        "val": getRows.data.values[1]
    }
    res.render('index', { data: datapass });
    // res.send(getRows.data.values);
});




app.listen(1919, () => {
  console.log('Server listening on port 1919');
});