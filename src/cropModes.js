import { Cloudinary } from "@cloudinary/url-gen";
import { scale, fill, thumbnail, auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export default function getCroppedImage(publicId, cropMode, gravityType, ar) {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });

  // Instantiate a CloudinaryImage object for the image
  const myImage = cld.image(publicId); 
  let width = 200;
  let height = 200;

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

  }
  else { 
    // If there's no crop mode, just scale the image
    myImage.resize(scale().height(200));
  }


  return myImage;
}