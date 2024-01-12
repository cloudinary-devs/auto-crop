import { Cloudinary } from "@cloudinary/url-gen";
import { scale, fill, thumbnail, auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export default function getCroppedImage(publicId, cropMode, gravityType) {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });

  console.log("Crop mode: ", cropMode);
  console.log("Gravity type:", gravityType);

  // Instantiate a CloudinaryImage object for the image
  const myImage = cld.image(publicId); 
  
  if (cropMode !== "none") {

    // Resize the image according to the crop mode

    if (cropMode === "fill"){   
      if (gravityType === "auto"){
        myImage.resize(fill().width(200).height(200).gravity(autoGravity()));
      }
      else {
        myImage.resize(fill().width(200).height(200));
      }
    }
    else if (cropMode === "thumb"){ 
      if (gravityType === "auto"){
        myImage.resize(thumbnail().width(200).height(200).gravity(autoGravity()));
      }
      else {
        myImage.resize(thumbnail().width(200).height(200));
      }
    }
    else if (cropMode === "auto"){   
      if (gravityType === "auto"){
        myImage.resize(auto().width(200).height(200).gravity(autoGravity()));
      }
      else {
        myImage.resize(auto().width(200).height(200));
      }
    }

  }
  else { 
    // If there's no crop mode, just scale the image
    myImage.resize(scale().width(200));
  }


  return myImage;
}