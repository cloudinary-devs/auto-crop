import './style.css';
import getCroppedImage from './cropModes';

// The public IDs of the images to display
const publicIds = [
    'docs/camera_1280-1020', 
    'docs/handbag1',
    'docs/golf', 
    'docs/handbag2',
    'docs/woman-hiker-mountain-water', 
    'docs/crowd-faces', 
    'docs/landscape-country',
    'docs/happy_people', 
    'docs/2cats_door'];
const imageUrls = ['', '', '', '', '', '', '', '', ''];

const numImages = publicIds.length;

// Update how the images are displayed, on-the-fly
function updateImages() {

    // Get the aspect ratio
    const ar = document.getElementById('ar').value;

    // No cropping or gravity if the original is displayed
    if (ar === 'original') {
        cropModeDropdown.querySelector('select').value = 'none';
        gravityTypeDropdown.querySelector('select').value = 'none';

        cropModeDropdown.querySelector('select').disabled = true;
        gravityTypeDropdown.querySelector('select').disabled = true;
    }
    // Enable the crop mode and gravity dropdowns for other aspect ratios
    else {
        cropModeDropdown.querySelector('select').disabled = false;
        gravityTypeDropdown.querySelector('select').disabled = false;
    }

    // Get the crop mode
    const cropMode = document.getElementById('cropmode').value;

    // c_auto_pad must be used with g_auto so set gravity to 'auto' and disable that dropdown
    if (cropMode == 'auto_pad')
    {
        gravityTypeDropdown.querySelector('select').value = 'auto';
        gravityTypeDropdown.querySelector('select').disabled = true;
    }

    // Get the gravity
    const gravityType = document.getElementById('gravitytype').value;

    // Display each of the images, using the transformation URL as the 'src' for the 'img' element
    for (let i = 1; i <= numImages; i++) {
        const imgElement = document.getElementById(`displayedImage${i}`);
        imgElement.src = getCroppedImage(publicIds[i - 1], cropMode, gravityType, ar).toURL();
    }
}

function createDropdown(id, values) {
    const dropdown = document.createElement('select');
    dropdown.classList.add('select-css');
    dropdown.setAttribute('id', id);
    dropdown.setAttribute('name', id);

    values.forEach((value) => {
        const option = document.createElement('option');
        option.setAttribute('value', value.toLowerCase().replace(/\s/g, '_'));
        option.setAttribute('id', value.toLowerCase());
        option.setAttribute('selected', value.toLowerCase() === 'none' ? 'true' : 'false');
        option.innerHTML = value;
        dropdown.appendChild(option);
    });

    return dropdown;
}

function createSelectionArea(labelText, id, values) {
    const surround = document.createElement('div');

    const label = document.createElement('label');
    label.innerHTML = `${labelText}:`;
    label.setAttribute('for', id);
    label.classList.add('selectLabel');
    surround.appendChild(label);

    const spacing = document.createElement('div');
    spacing.classList.add('spacing');
    surround.appendChild(spacing);

    const selectionArea = document.createElement('div');
    selectionArea.classList.add('selection');
    surround.appendChild(selectionArea);

    const dropdown = createDropdown(id, values);
    selectionArea.append(dropdown);

    document.body.appendChild(surround);

    // Return the created div for setting the initial value later
    return surround; 
}

// Create aspect ratio dropdown
const aspectRatioDropdown = createSelectionArea('Select an aspect ratio', 'ar', [
    'Original',
    'Square',
    'Portrait',
    'Landscape'
]);

// Create crop mode dropdown
const cropModeDropdown = createSelectionArea('Select a crop mode', 'cropmode', [
    'None',
    'Fill',
    'Thumb',
    'Auto',
    'Auto Pad'
]);

// Create gravity type dropdown
const gravityTypeDropdown = createSelectionArea('Select a type of gravity', 'gravitytype', ['None', 'Auto',]);


// Set the initial selected option for the select boxes
cropModeDropdown.querySelector('select').value = 'none';
gravityTypeDropdown.querySelector('select').value = 'none';
aspectRatioDropdown.querySelector('select').value = 'original';

// Add spacing between the second select box and the images
const spacingBetweenSelectAndImages = document.createElement('div');
spacingBetweenSelectAndImages.classList.add('spacing'); 
document.body.appendChild(spacingBetweenSelectAndImages);

const element = document.createElement('div');
element.classList.add('text', 'App');

const divCenter = document.createElement('div');
divCenter.classList.add('alignCenter');
element.appendChild(divCenter);

const spanContainer = document.createElement('span');

// Create the image elements
for (let i = 1; i <= numImages; i++) {
    const imgElement = document.createElement('img');
    imgElement.src = imageUrls[i - 1];
    imgElement.setAttribute('id', `displayedImage${i}`);
    imgElement.classList.add('imageInline');
    spanContainer.appendChild(imgElement);
}

divCenter.appendChild(spanContainer);
document.body.appendChild(element);

// Add event listeners for the dropdowns
document.getElementById('cropmode').addEventListener('change', updateImages);
document.getElementById('gravitytype').addEventListener('change', updateImages);
document.getElementById('ar').addEventListener('change', updateImages);

// Initial call to display the images with the initial settings
updateImages();
