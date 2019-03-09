//------------.gs----------// 
function doGet()
{
  return HtmlService.createHtmlOutputFromFile('Menu').setTitle('Menu-Meehai'); //--Open Html name 'Menu'--//
}

function doPost(e)
{
  Logger.log(e);
}

//--------------AppendRow-Google-sheet---------------//
function AppendRow(data)
{
  
  var currentTime = new Date().toLocaleString("DD/MM/YYY , h:mm:ss a");
  var sheet = SpreadsheetApp.openById('1ax75HMoWxRhd9PKbhluLcUL7F9018_HxUF5V7Pb9RgM'); //id google sheet
  sheet.appendRow([currentTime, data.MenuID, data.MenuOne, data.MenuTwo,data.MenuThree,data.PriceALL, 'X']); //data.Pay
  return 'Success!';
 
}
//--------------AppendRow-Google-sheet---------------//


//--------------UpdateColumn-Goolge-sheet---------------//
function UpdateSheet(data)
{
  var ss = SpreadsheetApp.openById('1ax75HMoWxRhd9PKbhluLcUL7F9018_HxUF5V7Pb9RgM'); //id google sheet
  var sheet = ss.getSheets()[0]; //sheet1
 
  var id = data.MenuID;
   var flag=0;
   //var country = data.Pay;
   var lr= sheet.getLastRow();
  
  for(var i=1;i<=lr;i++)
  {
    var rid = sheet.getRange(i,2).getValue(); //.getRange(row,column)
    //var rid = sheet.getRange('B35').getValue(); 
    //sheet.getRange('F35').setValue(rid);
    //sheet.getRange('G35').setValue(i);
    
     if(rid==id)
     {
      sheet.getRange(i,7).setValue(data.Pay);
      //sheet.getRange('G35').setValue(data.Pay);
      var result="value updated successfully";
      flag=1;
     }

  }
  if(flag==0)
    var result="id not found";
  
   result = JSON.stringify({
    "result": result
  });
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
//--------------UpdateColumn-Goolge-sheet---------------//


//--------------DeleteRow-Goolge-sheet---------------//
function DeleteRow(data)
{
  var ss = SpreadsheetApp.openById('1ax75HMoWxRhd9PKbhluLcUL7F9018_HxUF5V7Pb9RgM'); //id google sheet
  var sheet = ss.getSheets()[0]; //sheet1 
  var id = data.MenuID;
  
  //sheet.deleteRow(6);
  
   var flag=0;
   //var country = data.Pay;
   var lr= sheet.getLastRow();
  
  for(var i=1;i<=lr;i++)
  {
    var rid = sheet.getRange(i,2).getValue(); //.getRange(row,column)

     if(rid==id)
     {
      sheet.deleteRow(i); // Delete Row
      var result="value DeleteRow successfully";
      flag=1;
     }

  }
  if(flag==0)
    var result="id not found";
   result = JSON.stringify({
    "result": result
  });    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);
} 
//--------------DeleteRow-Goolge-sheet---------------//
