import React, { useEffect, useRef, useState } from 'react';
import './art-canvas-page.less';
import CanvasDraw from "react-canvas-draw";
import { connect } from 'react-redux';
import { uploadImage, loadImages } from '../../redux/project-artcanvas/project-artcanvas-reducer.js';
import LoadImagesInCanvas from './js/load-images-in-canvas.js';
import Preloader from '../../components/common/Preloader/preloader.js';

const ArtCanvasPage = (props) => {

    const drawingColorRef = useRef(null);
    const drawingLineWidthRef = useRef(null);
    const drawingLineWidthTextRef = useRef(null);
    const drawingLazyRadiusRef = useRef(null);
    const drawingLazyRadiusTextRef = useRef(null);
    const canvasDraw = useRef(null);
    const [brushColor, setBrushColor] = useState('#005E7A');
    const [brushRadius, setBrushRadius] = useState(30);
    const [lazyRadius, setLazyRadius] = useState(20);
    const [widthWindow, setWidthWindow] = useState(0);
  
    useEffect(() => {   
      props.loadImages();   
      window.addEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {        
        if(props.images) {
            LoadImagesInCanvas(props.images);            
        }        
    }, [props.images, widthWindow]);

    const updateDimensions = () => {
        setWidthWindow(window.innerWidth);
    }
  
    const changeDrawingColor = () => {
        setBrushColor(drawingColorRef.current.value);
    }

    const changeDrawingLineWidth = () => {
        let lineWidth = parseInt(drawingLineWidthRef.current.value, 10) || 1;
        setBrushRadius(lineWidth);
        drawingLineWidthTextRef.current.innerHTML = lineWidth;
    }

    const changeDrawingLazyRadius = () => {
        let lineWidth = parseInt(drawingLazyRadiusRef.current.value, 10) || 1;
        setLazyRadius(lineWidth);
        drawingLazyRadiusTextRef.current.innerHTML = lineWidth;
    }

    const OnClearCanvas = () => {
        canvasDraw.current.clear();
    }

    const OnUndoCanvas = () => {
        canvasDraw.current.undo(); 
    }

    const getCanvas = () => {
        let div = document.getElementsByClassName('canvasDrawClass')[0];
        if (!div) { return null; }
        return div.getElementsByTagName('canvas')[1];
    }

    const OnSaveCanvas = () => {
        let canvas = getCanvas();
        let context2D = canvas.getContext('2d');
        context2D.lineWidth = 5;
        context2D.strokeStyle = "gray";
        context2D.strokeRect(1,1,498,498);

        var imageData = canvas.toDataURL("image/png");
        imageData = imageData.replace('data:image/png;base64,', '');
        props.uploadImage(imageData);
        canvasDraw.current.clear();
    }
  
    if(!props.images) {
        return <Preloader />
    }

    return (
        <div className="artCanvasPage">

            <canvas className="canvas-header" id="canvasPicture"  ></canvas>

            <div className="page-wrap">
                <div id="draw-area">
                    <div className="canvas-container" >
                        <CanvasDraw
                            ref={canvasDraw}
                            brushColor={brushColor}
                            brushRadius={brushRadius}
                            lazyRadius={lazyRadius}
                            canvasWidth={500}
                            canvasHeight={500}
                            catenaryColor="#0a03w2"
                            className="canvasDrawClass"
                            gridColor="gray"
                         />                       
                    </div>

                    <div className="menu-edit">
                        <div className="header-buttons">
                            <button id="saveImg" className="btn btn-success" onClick={OnSaveCanvas}>Save</button><br />
                        </div>
                        <div id="drawing-mode-options">
                            <table id="art-draw-menu">
                                <tbody>
                                <tr>
                                    <td><label htmlFor="drawing-line-width">Line width:</label></td>
                                    <td><label className="infoDraw" ref={drawingLineWidthTextRef}>30</label><input type="range" defaultValue="30" min="0" max="150" id="drawing-line-width" ref={drawingLineWidthRef} onChange={changeDrawingLineWidth} /></td>
                                </tr>

                                <tr>
                                    <td><label htmlFor="drawing-lazy-radius">Lazy radius:</label></td>
                                    <td><label className="infoDraw" ref={drawingLazyRadiusTextRef}>20</label><input type="range" defaultValue="20" min="0" max="150" id="drawing-lazy-radius" ref={drawingLazyRadiusRef} onChange={changeDrawingLazyRadius} /></td>
                                </tr>

                                <tr>
                                    <td><label htmlFor="drawing-color">Line color:</label></td>
                                    <td><input type="color" defaultValue="#005E7A" id="drawing-color" ref={drawingColorRef} onChange={changeDrawingColor} /></td>
                                </tr>    
                                </tbody>
                            </table>
                        </div>
                        <div className="comment-art">
                            <p>
                                You can draw a picture and it will appears on our canvas.
                                Your work can be seen all guests of this page.
                            </p>
                            <p>
                                It's easy. Press 'Enter drawing mode' button and let's go...
                            </p>
                        </div>
                        <div className="footer-buttons">                                                        
                            <button id="clear-canvas" className="btn btn-primary" onClick={OnClearCanvas}>Clear</button>                            
                            <button id="undoCanvas" className="btn btn-primary" onClick={OnUndoCanvas}>Undo</button>
                            <br />
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
                <div id="warn-draw">
                    <h2>You can't draw in this screen size.</h2>
                </div>
        </div> 
    </div>
    );
}

const mapStateToProps = (state) => ({
    images: state.projectArtCanvas.images,
});

export default connect(mapStateToProps, {uploadImage, loadImages})(ArtCanvasPage);