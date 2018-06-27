function getBlock(imgSource, nameStr, majorStr, bioStr, endorsementsObj, center) {
  // 1st
  var mainBlock = document.createElement('div');
  mainBlock.className = "team__single center";

  // 2nd 
  var imageBlock = document.createElement('div');
  imageBlock.className = "team__single__image";

  // 3rd

  var metadataBlock = document.createElement('div');
  metadataBlock.className = "team__single__info";

  // 4th 
  var name = document.createElement('h3'); name.innerHTML = nameStr;
  var major = document.createElement('h5'); major.innerHTML = majorStr;
  var info = document.createElement('p'); info.innerHTML = bioStr;
  // TODO: lepatrick714 loop through the Endorsements if there are any 
  // var endorsements = document.createElement('h5'); endorsements.innerHTML(candidate.endorsements); 
  var endorsements = document.createElement('h5'); endorsements.innerHTML = "Endorsements";
  var endorsementBody = document.createElement('ul'); 
  for (var ele in endorsementsObj) { 
    // console.log("PRINTING " + endorsementsObj[ele]); 
    var endorseList = document.createElement('li'); 
    endorseList.className = "smaller" 
    endorseList.innerHTML = endorsementsObj[ele]; 
    endorsementBody.appendChild(endorseList);
  }

  endorsements.appendChild(endorsementBody);
  // Appending all childs to the main block 

  metadataBlock.appendChild(name);
  metadataBlock.appendChild(major);
  metadataBlock.appendChild(info);
  metadataBlock.appendChild(endorsements);
  mainBlock.appendChild(metadataBlock);

  // Debugging purposes 
  // console.log(mainBlock);
  return mainBlock;
}

for (var key in candidates) {
  if (candidates.hasOwnProperty(key)) {
    // Querying for Candidates 
    candidates[key].forEach(function(candidate) {
      block = getBlock(candidate.img, candidate.name, candidate.major, candidate.bio, candidate.endorsement, candidates[key].length);
      console.log("BLOCK " + block); 
      document.querySelector("#" + key + "_candidates").appendChild(block);
    });
  }
}
