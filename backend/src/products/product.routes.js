import { Router } from 'express';
import {getAllProductsFromCtrl, insertProductCtrl, patchProCtrl, deleteProdCtrl, getProductByCodeCtrl, searchProductsCtrl} from "./product.controller.js";

const routerProduct = Router();

routerProduct.get('/', getAllProductsFromCtrl);
routerProduct.get('/search', searchProductsCtrl);
routerProduct.get('/:codigo', getProductByCodeCtrl);
routerProduct.post('/', insertProductCtrl);
routerProduct.patch('/:codigo', patchProCtrl);
routerProduct.delete('/:codigo', deleteProdCtrl);

export default routerProduct;  