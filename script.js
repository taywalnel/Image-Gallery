class Image {
    constructor(src, width, height, div){
        this.src = src,
        this.width = width,
        this.height = height,
        this.div = div
    };
    updateSrc(newSrc){
        this.src = newSrc;
    };
    updateDimensions(newWidth, newHeight){
        this.width = newWidth;
        this.height = newHeight;
    };
};

button = document.querySelector("#button");
featuredImg = document.querySelector("#featuredImg");
img1 = document.querySelector("#img1");
img2 = document.querySelector("#img2");
img3 = document.querySelector("#img3");
img4 = document.querySelector("#img4");
imgArray = [img1, img2, img3, img4];

//initializes each image object
const imgObj1 = new Image(
    src = "",
    width = "",
    height = "",
    div = img1
);
const imgObj2 = new Image(
    src = "",
    width = "",
    height = "",
    div = img2
);
const imgObj3 = new Image(
    src = "",
    width = "",
    height = "",
    div = img3
);
const imgObj4 = new Image(
    src = "",
    width = "",
    height = "",
    div = img4
);

//listens for a button click to load images
button.addEventListener("click", () => {
    //clears any existing images
    clearImages();
    featuredImg.innerHTML = "";
    
    let width = document.querySelector("#widthInput").value;
    let height = document.querySelector("#heightInput").value;

    //makes sure inputs are satisfactory
    //there must be input
    //width, height must be >= 50 and <= 5000
    //width, height must be a number
    if(width.length == 0 || height.length == 0){
        console.log("Error: One or more of the fields was empty");
        featuredImg.innerText = "Please enter input.";
    } else if(width > 5000 || height > 5000){
        console.log("Error: Dimesions are too big");
        featuredImg.innerText = "Dimesions are too big (max: 5000x5000).";
    }else if(width < 50 || height < 50){
        console.log("Error: Dimesions are too small");
        featuredImg.innerText = "Dimesions are too small (min: 50x50).";
    }else if(isNaN(width) || isNaN(height)){
        console.log("Error: Input must be a number");
        featuredImg.innerText = "Input must be a number.";
    }else{
        //builds each of the four image objects
        imgObj1.updateSrc(createImgUrl(width, height));
        imgObj1.updateDimensions(width, height);

        imgObj2.updateSrc(createImgUrl(width, height));
        imgObj2.updateDimensions(width, height);

        imgObj3.updateSrc(createImgUrl(width, height));
        imgObj3.updateDimensions(width, height);

        imgObj4.updateSrc(createImgUrl(width, height));
        imgObj4.updateDimensions(width, height);
        
        let imgObjArray = [imgObj1, imgObj2, imgObj3, imgObj4];

        //loads each of the four gallery images
        loadImages(imgObjArray);

        //makes the first image the default to be displayed in the featured area
        featuredImg.append(createImgElement(imgObj1));
    };
    
});

//appends images to each of the four image containers
function loadImages(imgObjArray){
    for(i=0; i<4; i++){
        let imgElement = createImgElement(imgObjArray[i]);
        imgArray[i].append(imgElement);
        feature(imgObjArray[i]);
    };
};

//creates and returns a random image url
function createImgUrl(width, height){
    let seed = Math.floor(Math.random() * 9999) + 1;
    let url = "https://picsum.photos/seed/" + seed + "/" + width + "/" + height;
    return url;
};

//given an image object, returns an DOM element of type "img"
function createImgElement(imgObj){
    let element = document.createElement("img");
    element.src = imgObj.src;
    element.id = "imgFormat";
    return element;
};

//clears all content in each image div
function clearImages(){
    for(i=0; i<4; i++){
        imgArray[i].innerHTML = "";
    };
};

//adds an image to the featured image div when clicked
function feature(imgObj){
    imgObj.div.addEventListener("click", () => {
        featuredImg.innerHTML = "";
        featuredImg.append(createImgElement(imgObj));
    });
};