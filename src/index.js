import './style.css';
import getCroppedImage from './cropModes';

const publicIds = ['docs/camera', 'docs/happy_people', 'docs/golf'];
const imageUrls = ['', '', ''];

function updateImages() {
    const cropMode = document.getElementById('cropmode').value;
    const gravityType = document.getElementById('gravitytype').value;

    for (let i = 1; i <= 3; i++) {
        const imgElement = document.getElementById(`displayedImage${i}`);
        imgElement.src = getCroppedImage(publicIds[i - 1], cropMode, gravityType).toURL();
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

    return surround; // Return the created div for setting the initial value later
}

// Set the public IDs
const [publicId1, publicId2, publicId3] = publicIds;

// Create corp mode dropdown
const cropModeDropdown = createSelectionArea('Select a crop mode', 'cropmode', [
    'None',
    'Fill',
    'Thumb',
    'Auto',
]);

// Create gravity type dropdown
const gravityTypeDropdown = createSelectionArea('Select a type of gravity', 'gravitytype', ['None', 'Auto',]);

// Set 'None' as the initial selected option for both select boxes
cropModeDropdown.querySelector('select').value = 'none';
gravityTypeDropdown.querySelector('select').value = 'none';

// Add spacing between the second select box and the images
const spacingBetweenSelectAndImages = document.createElement('div');
spacingBetweenSelectAndImages.classList.add('spacing'); 
document.body.appendChild(spacingBetweenSelectAndImages);

// Create image elements
const element = document.createElement('div');
element.classList.add('text', 'App');

const divCenter = document.createElement('div');
divCenter.classList.add('alignCenter');
element.appendChild(divCenter);

const spanContainer = document.createElement('span');

for (let i = 1; i <= 3; i++) {
    const imgElement = document.createElement('img');
    imgElement.src = imageUrls[i - 1];
    imgElement.setAttribute('id', `displayedImage${i}`);
    imgElement.classList.add('imageInline');
    spanContainer.appendChild(imgElement);
}

divCenter.appendChild(spanContainer);
document.body.appendChild(element);

document.getElementById('cropmode').addEventListener('change', updateImages);
document.getElementById('gravitytype').addEventListener('change', updateImages);

updateImages();
