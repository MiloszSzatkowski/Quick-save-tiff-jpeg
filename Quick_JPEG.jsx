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
  Path = app.recentFiles[0];
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
