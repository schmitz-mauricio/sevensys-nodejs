import * as request from "request";

export class Pagarme{
    public sUri = `https://api.pagar.me/1`;
    public auth = `?api_key=ak_test_Y00shvmoBliT95zNSE6yAFR45pN8rB`;

    public externalHost = `8ca5839b.ngrok.io`;
    public postBackUrl = `https://nodejs:sevensys@${this.externalHost}/order/pagarme?id=`;

    public async transaction(data){
        return new Promise(async (resolve, reject) => {
            data.postback_url = this.postBackUrl + data._id;

            request.post({
                url: `${this.sUri}/transactions${this.auth}`,
                headers: { "Content-Type": "application/json"},
                timeout: 20000,
                json: data
            },
            async (err, httpResponse, body) => {
                if(httpResponse && httpResponse.statusCode === 200) {
                    resolve(body);
                } else if(err) {
                    resolve(err)
                } else {
                    resolve(body);
                }
            });
        });
    }
}