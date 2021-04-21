import React from 'react';
import FileBrowse from './file-browse';
import { connect } from 'react-redux';
import {getDirectory} from '../../../redux/file-browse-reducer';

const FileBrowseComponent = (props) => {

    return (
        <FileBrowse />
    );
}

export default connect(null, {getDirectory})(FileBrowseComponent);