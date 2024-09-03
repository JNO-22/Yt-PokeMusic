let req = new XMLHttpRequest();
let spriteData = {};
export async function getData() {
  return new Promise((res, rej) => {
    req.open("GET", "sprites/sylveon/AnimData.xml", true); // Lee los datos de las animaciones de forma asincrónica
    req.send();
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        parseXML(req.responseXML);
        JSON.stringify(spriteData);
        res(spriteData);
      } else if (req.readyState == 4 && req.status == 404) {
        rej(new Error("XML not found"));
      }
    };
  });
}

function parseXML(xml) {
  let anims = xml.getElementsByTagName("Anims")[0];
  let anim = anims.getElementsByTagName("Anim");
  for (const animElement of anim) {
    if (animElement.getElementsByTagName("FrameWidth")[0]) {
      let name =
        animElement.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
      let frameWidth = parseInt(
        animElement.getElementsByTagName("FrameWidth")[0].childNodes[0].nodeValue
      );
      let frameHeight = parseInt(
        animElement.getElementsByTagName("FrameHeight")[0].childNodes[0].nodeValue
      );
      let durationNodes = animElement.getElementsByTagName("Duration");
      let duration = [];
      for (const element of durationNodes) {
        duration.push(parseInt(element.childNodes[0].nodeValue));
      }
      spriteData[name] = {
        name: name,
        frameWidth: frameWidth,
        frameHeight: frameHeight,
        duration: duration,
      };
    }
  }
}
