import * as request from "request";
import {UserApiRequester} from "./useApiRequester";

export class ProductApiRequester{
    public useApiRequester: UserApiRequester = new UserApiRequester();

    public stock(product: Number, type: String, quantity: Number){
        const body = { type, quantity };

        return new Promise(async (resolve, reject) => {
            const sUri = `http://localhost:${process.env.PRODUCT_PORT || 3002}/product/stock/${product}`;
        
            try {
                const requestAuth:any = await this.useApiRequester.login('mauricio', '123123');
                if(requestAuth.auth) {
                    const auth = requestAuth.token;
    
                    request.put({
                        url: sUri,
                        headers : { "x-access-token": auth },
                        timeout: 20000,
                        rejectUnauthorized: false,
                        json: body,
                    },
                    async (err, httpResponse, body) => {
                        if (httpResponse && httpResponse.statusCode === 200) {
                            resolve(body);
                        } else if (err) {
                            resolve(err);
                        } else {
                            resolve(body);
                        }
                    });
                } else {
                    resolve(requestAuth);
                }
            } catch(e) {
                resolve(e);
            }
        });
    }
}