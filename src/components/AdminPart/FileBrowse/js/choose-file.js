//import CKEditor from "react-ckeditor-component";
import s from '../file-browse.module.less';

const onChooseFile = () => {
    var funcNum = "1";
    var chooseFileButton = document.getElementById(s.chooseFile);
    if(chooseFileButton) {
        chooseFileButton.addEventListener('click', function () {
            var fileUrl = document.getElementsByClassName(s.activeFile)[0].getElementsByTagName('img')[0].src;
            window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl);
            window.close();
        });
    }

}

export default onChooseFile;