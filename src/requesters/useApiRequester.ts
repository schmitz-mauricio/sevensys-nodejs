import * as request from "request";

export class UserApiRequester{
    
    public login(login: String, password: String){
        const body = { login, password };

        return new Promise(async (resolve, reject) => {
            const sUri = `http://localhost:${process.env.GATEWAY_PORT || 3000}/user/login`;
        
            request.post({
                url: sUri,
                headers : { Authorization: "Basic bm9kZWpzOnNldmVuc3lz" },
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
        });
    }
}