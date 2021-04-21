import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from "../../../../../redux/redux-store";
import { addPhoto } from "../../../../../redux/project-messenger/profile-reducer";
import './react-cropper.less';

type ReactCropperType = {
  rerender: boolean
}

export const ReactCropper: React.FC<ReactCropperType> = React.memo(({rerender}) => {

  const dispatch = useDispatch();
  const photo = useSelector((state: AppStateType) => state.profilePage.profile.photos.large);
  const cropperRef = useRef<HTMLImageElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(key + 1);
  }, [rerender])

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    let imageData = cropper.getCroppedCanvas().toDataURL();
    dispatch(addPhoto(imageData));
  };

  return (<div key={key}>
            <Cropper
            src={photo}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={1}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            />
        </div>
  );
});