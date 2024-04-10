import { getAuth, getSpreadSheetValues} from "../services/GoogleSheetServices.js";
import { sendMail } from "../services/NodeMailerServices.js";

export const  SendMails = async(req, res, next) => {
    try {
        const auth = await getAuth();
        const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: "Sheet1!A2:C1000"});
        for(let i=0; i<sheets.values.length; i++) {
            sendMail(i, sheets);
        }
        res.status(200).json({msg: "Sucessfully sent mails", sheets: sheets})
    } catch(ex) {
        next(ex)        
    }
}