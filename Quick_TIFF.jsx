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
