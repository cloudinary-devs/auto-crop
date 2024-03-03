import { Cloudinary } from "@cloudinary/url-gen";
import { scale, fill, thumbnail, auto, autoPad } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import {auto as bgAuto, color} from "@cloudinary/url-gen/qualifiers/background";

export default function getCroppedImage(publicId, cropMode, gravityType, ar) {

  // Create a Cloudinary instance and set the cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });

  // Instantiate a CloudinaryImage object for the image
  const myImage = cld.image(publicId); 
  let width = 200;
  let height = 200;

  // Set the dimensions based on the selected aspect ratio
  if (ar === 'original')
  {
    cropMode = 'none';
  }
  else if (ar === 'square')
  {
    width = 200;
    height = 200;
  }
  else if (ar === 'portrait')
  {
    width = 200;
    height = 400;
  }
  else if (ar === 'landscape')
  {
    width = 400;
    height = 200;
  }
  
  if (cropMode !== "none") {

    // Resize the image according to the crop mode
    if (cropMode === "fill"){   
      if (gravityType === "auto"){
        myImage.resize(fill().width(width).height(height).gravity(autoGravity()));
      }
      else {
        myImage.resize(fill().width(width).height(height));
      }
    }
    else if (cropMode === "thumb"){ 
      if (gravityType === "auto"){
        myImage.resize(thumbnail().width(width).height(height).gravity(autoGravity()));
      }
      else {
        myImage.resize(thumbnail().width(width).height(height));
      }
    }
    else if (cropMode === "auto"){   
      if (gravityType === "auto"){
        myImage.resize(auto().width(width).height(height).gravity(autoGravity()));
      }
      else {
        myImage.resize(auto().width(width).height(height));
      }
    }
    else if (cropMode === "auto_pad"){
      // Specify the padding to be colored automatically
      myImage.resize(autoPad().width(width).height(height).gravity(autoGravity()).background(bgAuto()));

      // Specify the padding to be black
      //myImage.resize(autoPad().width(width).height(height).gravity(autoGravity()).background(color("black")));

      // Specify the padding to be RGB #000000
      //myImage.resize(autoPad().width(width).height(height).gravity(autoGravity()).background(color("#000000")));

    }

  }
  else { 
    // If there's no crop mode, just scale the image
    myImage.resize(scale().height(200));
  }

  // Return the transformed CloudinaryImage object
  return myImage;
}