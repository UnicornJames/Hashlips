const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const {
  layers,
  width,
  height,
  description,
  baseImageUri,
  editionSize,
  startEditionFrom,
  rarityWeights,
} = require("./input/config.js");
const console = require("console");
const { Console } = require("console");
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// saves the generated image to the output folder, using the edition count as the name
const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `./outputcakeimg/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

// name
const firstNameR = ["София", "Анастасия", "Анна", "Елизавета", "Виктория", "Дарья", "Полина", "Варвара", "Алиса", "Александра", "Екатерина", "Ксения", "Арина", "Вероника", "Василиса", "Валерия", "Милана", "Ульяна", "Кира", "Вера", "Маргарита", "Алёна", "Кристина", "Алина", "Таисия", "Ольга", "Диана", "Юлия", "Наташа", "Оксана", "Лидия", "Злата", "Зинаида", "Жана", "Елизавета", "Владлена", "Валентина", "Ульяна", "Татьяна", "Светлана", "Со́ня", "Саша", "Сама́ра", "Сабина"];
const lastNameR = ["Иванова", "Петровa", "Сидоровиa", "Смирновa", "Волковa", "Фёдоровa", "Семёновa", "Михайловa", "Егоровa", "Васильевa", "Николаевa", "Морозовa", "Степановa", "Новиковa", "Козловa", "Павловa", "Соколовa", "Лебедев", "Кузнецовa", "Oрелa"];

const firstNameE = ["Olivia", "Lily", "Sophia", "Emily", "Amelia", "Ava", "Isla", "Isabella", "Ella", "Mia", "Poppy", "Evie", "Charlotte", "Alice", "Freya", "Jessica", "Phoebe", "Aria", "Eva", "Evelyn", "Daisy", "Emilia", "Scarlett", "Penelope", "Layla", "Ruby", "Lucy", "Maya", "Thea", "Darcie", "Zara", "Matilda"];
const lastNameE = ["Mitchell", "Murray", "Paterson", "Sinclair", "Wright", "Archer", "Armstrong", "Bailey", "Baker", "Clarke", "Fisher", "Gilbert", "Mason", "Tailor", "Weaver", "Smith", "Jones", "Taylor", "Brown", "Williams"];

const firstNameA = ["Olivia", "Emma", "Charlotte", "Amelia", "Ava", "Sophia", "Isabella", "Mia", "Evelyn", "Harper", "Luna", "Camila", "Gianna", "Elizabeth", "Victoria", "Ella", "Abigail", "Sofia", "Avery", "Scarlett", "Emily", "Aria", "Penelope", "Emilia", "Layla", "Mila", "Nora", "Hazel", "Aurora", "Ellie", "Lucy", "Ivy", "Lillian", "Naomi", "Natalie", "Kennedy", "Skylar", "Piper", "Athena", "Liliana", "Samantha", "June", "Fernanda", "Zelda"] ;
const lastNameA = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Lee", "Thompson", "White", "Harris"];

const firstNameK = [ "해", "유", "새", "미", "연", "보", "비", "사", "소", "현", "수"];
const lastNameK = ["미", "연", "나", "라", "수", "별", "경", "랑", "주", "영"];
const surnameK = ["김", "이", "박", "최", "한", "강", "정"];

var NameList = [];

const setNameList = (_firstNameR, _lastNameR, _firstNameE, _lastNameE, _firstNameA, _lastNameA, _firstNameK, _lastNameK, _surnameK) => {
  let l = 0;
  // let namelist;
  for(let i = 0; i < firstNameR.length; i++) {
    for(let j = 0; j < lastNameR.length; j++){
      l = lastNameR.length * i + j;
      if (l < firstNameR.length * lastNameR.length){
        NameList[l] = (_firstNameR[i] +"."+ _lastNameR[j]);
      }else{
        break;
      }
    }
  }
  for(let i = 0; i < firstNameE.length; i++) {
    for(let j = 0; j < lastNameE.length; j++){
      l = lastNameE.length * i + j + firstNameR.length * lastNameR.length;
      if (l < firstNameE.length * lastNameE.length + firstNameR.length * lastNameR.length){
        NameList[l] = (_firstNameE[i] +"."+ _lastNameE[j]);
      }else{
        break;
      }
    }
  }
  for(let i = 0; i < firstNameA.length; i++) {
    for(let j = 0; j < lastNameA.length; j++){
      l = lastNameA.length * i + j + firstNameE.length * lastNameE.length + firstNameR.length * lastNameR.length;
      if (l < firstNameA.length * lastNameA.length + firstNameE.length * lastNameE.length + firstNameR.length * lastNameR.length){
        NameList[l] = (_firstNameA[i] +"." +_lastNameA[j]);
      }else{
        break;
      }
    }
  }
  for(let i = 0; i < surnameK.length; i++) {
    for(let j = 0; j < firstNameK.length; j++){
      for(let k = 0; k < lastNameK.length; k++){
        l = k + j * lastNameK.length + i * firstNameK.length * lastNameK.length + firstNameA.length * lastNameA.length + firstNameE.length * lastNameE.length + firstNameR.length * lastNameR.length;
        if (l < surnameK.length * firstNameK.length * lastNameK.length + firstNameA.length * lastNameA.length + firstNameE.length * lastNameE.length + firstNameR.length * lastNameR.length){
          NameList[l] = (_surnameK[i] +_firstNameK[j] +_lastNameK[k]);
        }else{
          break;
        }
      }
    }
  }
  return NameList;
}

var heroname;

const setHeroname = (NameList, h) => {
  return NameList[h];
}

// adds a signature to the top left corner of the canvas
const signImage = (_sig) => {
  ctx.fillStyle = "#000000";
  ctx.font = "bold 30pt Courier";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(_sig, 40, 40);
};

// generate a random color hue
const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, 85%)`;
  return pastel;
};

const drawBackground = () => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, width, height);
};

// add metadata for individual nft edition
const generateMetadata = (_dna, _edition, _attributesList, _heroname) => {
  let dateTime = Date.now();
  let tempMetadata = {
    dna: _dna.join(""),
    name: `RugRatz #${_edition}`,
    description: description,
    image: `${baseImageUri}/${_edition}`,
    edition: _edition,
    date: dateTime,
    attributes: _attributesList,
    fee_recipient : '0x0460cfC76bC0197c1302CB2b70816793acf493d9',
    seller_fee_basis_points: '1000',
  };
  return tempMetadata;
};

// prepare attributes for the given element to be used as metadata
const getAttributeForElement = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  let attribute = {
    name: selectedElement.name,
    rarity: selectedElement.rarity,
  };
  return attribute;
};

// loads an image from the layer path
// returns the image in a format usable by canvas
const loadLayerImg = async (_layer) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${_layer.selectedElement.path}`);
    resolve({ layer: _layer, loadedImage: image });
  });
};

const drawElement = (_element) => {
  ctx.drawImage(
    _element.loadedImage,
    _element.layer.position.x,
    _element.layer.position.y,
    _element.layer.size.width,
    _element.layer.size.height
  );
};

// check the configured layer to find information required for rendering the layer
// this maps the layer information to the generated dna and prepares it for
// drawing on a canvas
const constructLayerToDna = (_dna = [], _layers = [], _rarity) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    let selectedElement = layer.elements.find(element => element.id === _dna[index]);
    return {
      location: layer.location,
      position: layer.position,
      size: layer.size,
      selectedElement: {...selectedElement, rarity: _rarity },
    };
  });
  return mappedDnaToLayers;
};

// check if the given dna is contained within the given dnaList 
// return true if it is, indicating that this dna is already in use and should be recalculated
const isDnaUnique = (_DnaList = [], _dna = []) => {
  let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
  return foundDna == undefined ? true : false;
};

const getRandomRarity = (_rarityOptions) => {
  let randomPercent = Math.random() * 100;
  let percentCount = 0;

  for (let i = 0; i <= _rarityOptions.length; i++) {
    percentCount += _rarityOptions[i].percent;
    if (percentCount >= randomPercent) {
      console.log(`use random rarity ${_rarityOptions[i].id}`)
      return _rarityOptions[i].id;
    }
  }
  return _rarityOptions[0].id;
}

// create a dna based on the available layers for the given rarity
// use a random part for each layer
const createDna = (_layers, _rarity) => {
  let randNum = [];
  let _rarityWeight = rarityWeights.find(rw => rw.value === _rarity);
  _layers.forEach((layer) => {
    let num = Math.floor(Math.random() * layer.elementIdsForRarity[_rarity].length);

    if (_rarityWeight && _rarityWeight.layerPercent[layer.id]) {
      // if there is a layerPercent defined, we want to identify which dna to actually use here (instead of only picking from the same rarity)
      let _rarityForLayer = getRandomRarity(_rarityWeight.layerPercent[layer.id]);
      num = Math.floor(Math.random() * layer.elementIdsForRarity[_rarityForLayer].length);
      randNum.push(layer.elementIdsForRarity[_rarityForLayer][num]);
    } else {
      randNum.push(layer.elementIdsForRarity[_rarity][num]);
    }
  });
  return randNum;
};

// holds which rarity should be used for which image in edition
let rarityForEdition;
// get the rarity for the image by edition number that should be generated
const getRarity = (_editionCount) => {

  if (!rarityForEdition) {
    // prepare array to iterate over
    rarityForEdition = [];
    rarityWeights.forEach((rarityWeight) => {
      for (let i = rarityWeight.from; i <= rarityWeight.to; i++) {
        rarityForEdition.push(rarityWeight.value);
      }
    });
  }
  return rarityForEdition[editionSize - _editionCount];
};


// ----------------------------------------------------------------single metadata------------------------------------------------------
// const writeMetaData = (_data) => {
//   fs.writeFileSync("./output1/_metadata.json", _data);
// };
// -------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------multi metadata-------------------------------------------------------
let editionCount = startEditionFrom;

const writeMetaData = (_data, editionCount) => {
  fs.writeFileSync("./outputcakemetadata/_metadata_" + editionCount + ".json", _data);
};
// -------------------------------------------------------------------------------------------------------------------------------------

// holds which dna has already been used during generation
let dnaListByRarity = {};
// holds metadata for all NFTs
let metadataList = [];
// Create generative art by using the canvas api
const startCreating = async () => {
  console.log('##################');
  console.log('# Generative Art');
  console.log('# - Create your NFT collection');
  console.log('##################');

  console.log();
  console.log('start creating NFTs.')

  // -------------------------------------------------------------set NameList---------------------------------------------------------
  NameList = setNameList(firstNameR, lastNameR, firstNameE, lastNameE, firstNameA, lastNameA, firstNameK, lastNameK, surnameK);
  // ----------------------------------------------------------------------------------------------------------------------------------

  // clear meta data from previous run
  // -------------------------------------------------------------single metadata------------------------------------------------------
  // writeMetaData("");
  // ----------------------------------------------------------------------------------------------------------------------------------

  // prepare dnaList object
  rarityWeights.forEach((rarityWeight) => {
    dnaListByRarity[rarityWeight.value] = [];
  });

  // create NFTs from startEditionFrom to editionSize
  // let editionCount = startEditionFrom;
  while (editionCount <= editionSize) {

  // ----------------------------------------------------------------multi metadata-------------------------------------------------------
    writeMetaData("");
  // -------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------set name-----------------------------------------------------------
    let h = Math.floor(Math.random() * 5000) % (surnameK.length * firstNameK.length * lastNameK.length + firstNameA.length * lastNameA.length + firstNameE.length * lastNameE.length + firstNameR.length * lastNameR.length);

    heroname = setHeroname(NameList,  h);
  // -------------------------------------------------------------------------------------------------------------------------------------

    console.log('creating NFT %d of %d', editionCount, editionSize);

    // get rarity from to config to create NFT as
    let rarity = getRarity(editionCount);
    console.log('- rarity: ' + rarity);

    // calculate the NFT dna by getting a random part for each layer/feature 
    // based on the ones available for the given rarity to use during generation
    let newDna = createDna(layers, rarity);
    while (!isDnaUnique(dnaListByRarity[rarity], newDna)) {
      // recalculate dna as this has been used before.
      console.log('found duplicate DNA ' + newDna.join('-') + ', recalculate...');
      newDna = createDna(layers, rarity);
    }
    console.log('- dna: ' + newDna.join('-'));

    // propagate information about required layer contained within config into a mapping object
    // = prepare for drawing
    let results = constructLayerToDna(newDna, layers, rarity);
    let loadedElements = [];

    // load all images to be used by canvas
    results.forEach((layer) => {
      loadedElements.push(loadLayerImg(layer));
    });

    // elements are loaded asynchronously
    // -> await for all to be available before drawing the image
    await Promise.all(loadedElements).then((elementArray) => {
      // create empty image
      ctx.clearRect(0, 0, width, height);
      // draw a random background color
      drawBackground();
      // store information about each layer to add it as meta information
      let attributesList = [];
      // draw each layer
      elementArray.forEach((element) => {
        drawElement(element);
        attributesList.push(getAttributeForElement(element));
      });
      // add an image signature as the edition count to the top left of the image
      // signImage(`#${editionCount}`);
      // write the image to the output directory
      saveImage(editionCount);
      let nftMetadata = generateMetadata(newDna, editionCount, attributesList, heroname);

      // ----------------------------------------------multi metadata------------------------------------------------
      writeMetaData(JSON.stringify(nftMetadata),editionCount);
      // ------------------------------------------------------------------------------------------------------------

      // metadataList.push(nftMetadata)
      // console.log('- metadata: ' + JSON.stringify(nftMetadata));
      // console.log('- edition ' + editionCount + ' created.');
      // console.log();
    });
    dnaListByRarity[rarity].push(newDna);
    editionCount++;
  }

  // ----------------------------------------------single metadata-----------------------------------------------
  // writeMetaData(JSON.stringify(metadataList));
  // ------------------------------------------------------------------------------------------------------------

};

// Initiate code
startCreating();