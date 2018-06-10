preferences.rulerUnits = Units.CM;

saveState();

app.activeDocument.flatten();

//to cmyk
var idCnvM = charIDToTypeID( "CnvM" );
    var desc54 = new ActionDescriptor();
    var idT = charIDToTypeID( "T   " );
    var idCMYM = charIDToTypeID( "CMYM" );
    desc54.putClass( idT, idCMYM );
executeAction( idCnvM, desc54, DialogModes.NO );

var Path, NameTemp, Name, temp;
try {
  Path = app.activeDocument.path;
} catch (e) {
  Path = app.recentFiles[0];
}


var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
var Suffix = "print";
var saveFile = File(Path + "/" + Name + "_" + Suffix + '.tif');

SaveTIFF(saveFile);

undo(historyStatus);


function SaveTIFF(saveFile){
tiffSaveOptions = new TiffSaveOptions();
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.alphaChannels = true;
tiffSaveOptions.layers = true;
tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW;
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE);
}

function undo (state) {
 app.activeDocument.activeHistoryState = state;
}

function saveState () {
  historyStatus = app.activeDocument.activeHistoryState ;
}
