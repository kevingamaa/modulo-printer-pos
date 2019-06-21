import  express =  require('express');


import { PrinterController } from '../controllers/printer-controller';

const router = express.Router();

const ctrl = new PrinterController();
router.get('/', ctrl.get );
router.post('/', ctrl.printer );


export default router;