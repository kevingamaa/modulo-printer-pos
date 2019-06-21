import { Response, Request } from 'express';
import { Master } from "../models/printer/master-model";
import { Delivery as PrinterDelivery } from "../models/printer/delivery-model";
import { Prepare as PrinterPrepare } from "../models/printer/prepare-model";


const printerMaster = new Master();
const printerDelivery = new PrinterDelivery();
const printerPrepare = new PrinterPrepare();

export class PrinterController {
    constructor() {

    }
    get(req: Request, res: Response) {
        res.status(200).json(printerMaster.all);
    }

    printer(req: Request, res: Response) {
       
        if(req.body.printer_options.master) {
            printerMaster.build(req.body).execute();
        }
        if(req.body.printer_options.prepare)
        {
            printerPrepare.build(req.body).execute();
        }
        
        if(req.body.type == 2) {
            printerDelivery.build(req.body).execute();
        }   
  
        res.status(200).send(true);
    }
}