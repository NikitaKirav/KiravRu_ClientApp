import { instance } from "./kirav-api";

export const projectArtCanvasAPI = {
    uploadImage(imageData) {
        return instance.post(`projects/artcanvas/uploadImage`, {ImageData: imageData}).then(response => {
            return response.data;
        }); 
    },

    loadImages() {
        return instance.get(`projects/artcanvas/imagePaths`).then(response => {
            return response.data;
        });
    }
}