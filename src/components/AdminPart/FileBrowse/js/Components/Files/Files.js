import file from '../File';
import navigation from '../Navigation';
import imageService from '../../image-service';
import { getFileExplorer } from '../../dom';
import s from '../../../file-browse.module.less';

export default class Files {

    getFiles(url) {
        let fileExplorer = getFileExplorer();
        fileExplorer.innerHTML = '';
        imageService.getFiles(url)
            .then(data => {
                this.renderFiles(data.filesList);
                this.drawToDom(fileExplorer);
                navigation.showButtonsChangingFile();
            });
    }

    drawToDom(selector) {
        this.selector = selector;
        selector.appendChild(this.fragment);
    }

    renderFiles(data) {
        this.fragment = document.createDocumentFragment();
        data.forEach(data => {
            const li = document.createElement('li');
            li.classList.add(s.imageElement, s.flexItem);
            li.innerHTML = file(data);
            this.fragment.appendChild(li);
        });
    }
}