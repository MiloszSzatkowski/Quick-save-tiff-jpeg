preferences.rulerUnits = Units.CM;

saveState();

app.activeDocument.flatten();

//to RGB
var id11 = charIDToTypeID("CnvM");
var desc4 = new ActionDescriptor();
var id12 = charIDToTypeID("T   ");
var id13 = charIDToTypeID("RGBM");
desc4.putClass(id12, id13);
var id14 = charIDToTypeID("Fltt");
desc4.putBoolean(id14, false);
executeAction(id11, desc4, DialogModes.NO);

app.activeDocument.resizeImage(35, null, 72, ResampleMethod.BICUBIC);

var Path, NameTemp, Name, temp;
try {
  Path = app.activeDocument.path;
} catch (e) {

    Path  = 0;

    //decode and clean input
    //Then delete numerical ending of multi page pdfs
    NameTemp = decodeURI(app.activeDocument.name.toString().
    replace(/((-\d\d)\.pdf)|((-\d)\.pdf)/g), '');

    //if it was a single page pdf
    NameTemp = NameTemp.replace('.pdf', '');

    //if undefined was appended (yes, it may happen with regex)
    NameTemp = NameTemp.replace('undefined', '')

    Name = NameTemp;

    for( var i =0; i < app.recentFiles.length; i++){

       temp = decodeURI(app.recentFiles[i].toString()).split('/');
       temp = temp[temp.length-1].replace('.pdf', '');

       if ( temp == Name){
          Path = decodeURI(app.recentFiles[i].toString());
              break;
       }
    }
}

if(!Path){
       alert ("Script couldn't find the path of opened file");
} else {
       // alert (Path);
}


var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
var Suffix = "prev";
var saveFile = File(Path + "/" + "_" + Name + "_" + Suffix + ".jpg");

SaveJPEG(saveFile, 6);

undo(historyStatus);

function SaveJPEG(saveFile, jpegQuality) {
  jpgSaveOptions = new JPEGSaveOptions();
  jpgSaveOptions.embedColorProfile = true;
  jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
  jpgSaveOptions.matte = MatteType.NONE;
  jpgSaveOptions.quality = jpegQuality;
  activeDocument.saveAs(saveFile, jpgSaveOptions, true, Extension.LOWERCASE);
}

function undo(state) {
  app.activeDocument.activeHistoryState = state;
}

function saveState() {
  historyStatus = app.activeDocument.activeHistoryState;
}
