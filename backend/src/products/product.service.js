import getAllProductsFromDB from "./product.repository.js";

async function getAllProductsFromService(){
        const result = await getAllProductsFromDB();
        return result
    };
 export default getAllProductsFromService;