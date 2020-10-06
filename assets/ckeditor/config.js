/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    config.extraPlugins = 'codesnippet';
    config.codeSnippet_theme = 'vs';
    config.skin = 'moono-dark';
    config.height = '40vh';
    config.filebrowserUploadUrl = '/image/upload_ckeditor';
    config.filebrowserBrowseUrl = '/image/filebrowse';
    config.filebrowserUploadMethod = 'form';
    config.language = 'en';
	// Define changes to default configuration here. For example:
	
	// config.uiColor = '#AADC6E';
};
