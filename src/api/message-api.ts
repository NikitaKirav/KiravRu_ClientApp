import { instance } from "./kirav-api";

export const messageAPI = {
    send(email, message) {
        return instance.post(`message/send`, {email, message}).then(response => {
            return response.data;
        });
    },
}