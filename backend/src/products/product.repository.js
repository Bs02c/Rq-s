    import client from "../database/connection.js";

    async function getAllProductsFromDB (){
        const result = await client.query("SELECT * FROM  product;");
        return result.rows;
    };

    export default getAllProductsFromDB;