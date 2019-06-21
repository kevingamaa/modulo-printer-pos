import { Master } from "../models/printer/master-model";
import { Response, Request } from 'express';

const printer = new Master();

export class PrinterController {
    constructor() {

    }
    get(req: Request, res: Response) {
        res.status(200).json(printer.all);
    }

    printer(req: Request, res: Response) {
        res.status(200).send(printer.build(req.body));
    }
}