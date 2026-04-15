import { Router } from 'express';
import {getAllRqCtrl, getSpecificRqCtrl, postRqCtrl} from "./requisicion.controller.js";

const routerRequisicion = Router();

routerRequisicion.get('/', getAllRqCtrl);
routerRequisicion.get('/:consecutivo', getSpecificRqCtrl);
routerRequisicion.post('/', postRqCtrl);

export default routerRequisicion; 