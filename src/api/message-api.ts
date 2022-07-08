import { instance } from "./kirav-api";

export const messageAPI = {
    send(name, email, message) {
        return instance.post(`message/send`, {name, email, message}).then(response => {
            return response.data;
        });
    },
}