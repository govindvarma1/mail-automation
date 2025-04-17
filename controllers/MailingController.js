import { getAuth, getSpreadSheetValues, updateSpreadSheetsValues} from "../services/GoogleSheetServices.js";
import { sendMail } from "../services/NodeMailerServices.js";

export const  SendMails = async(req, res, next) => {
    try {
        const sentEmails = [];
        const {from, to} = req.body;
        const auth = await getAuth();
        const spreadsheetId = process.env.SHEET_ID;
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: `FOOD_COUPONS_QR!A${from}:F${to}`});
        for(let i=0; i<sheets.values.length; i++) {
            if(sheets.values[i][0] == "" || sheets.values[i][2] == "") {
                console.log("Fields are empty");
            } else if(sheets.values[i][5] == "Yes") {
                console.log("Already sent mail to this person", sheets.values[i][0]);
            }
            else {
                sendMail(i, sheets, from);
                sentEmails.push(sheets.values[i][1]);
                updateSpreadSheetsValues({spreadsheetId, auth, range: `FOOD_COUPONS_QR!F${i+from}:F${i+from}`, data: [["Yes"]]});
            }
        }
        res.status(200).json({msg: "Successfully sent mails", sentEmails: sentEmails});
    } catch(ex) {
        next(ex)        
    }
}