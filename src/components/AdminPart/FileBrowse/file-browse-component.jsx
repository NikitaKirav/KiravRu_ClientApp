import React from 'react';
import FileBrowse from './file-browse.jsx';
import { connect } from 'react-redux';
import {getDirectory} from '../../../redux/file-browse-reducer.js';

const FileBrowseComponent = (props) => {

    return (
        <FileBrowse />
    );
}

export default connect(null, {getDirectory})(FileBrowseComponent);