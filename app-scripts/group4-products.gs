//------------------- Write Products Data to Firestore ----------------

function writeProductsDataToFirebase() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
  
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Products
  // ProductID	ProductName	SupplierID	CategoryID	QuantityPerUnit	UnitPrice	UnitsInStock	UnitsOnOrder	ReorderLevel	Discontinued
  
  var sheetName = 'products';
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = activateSheetByName(sheetName);
Logger.log(sheetName);
  
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  
// Logger.log(data.length); // the number of rows in the sheet
  
  // Use this loop code if you want all rows in the sheet: 
  //   for(var i = 1; i < data.length; i++) {
  
for(var i = 1; i < 10; i++) { 
 var ProductID = data[i][0];
 var ProductName = data[i][1];
Logger.log(ProductID + '-' + ProductName);
 dataToImport[ProductID + '-' + ProductName] = {

   ProductID:data[i][0],
   ProductName:data[i][1],
   SupplierID:data[i][2],
   CategoryID:data[i][3],
   QuantityPerUnit:data[i][4],
   UnitPrice:data[i][5],
   UnitsInStock:data[i][6],
   UnitsOnOrder:data[i][7],
   ReorderLevel:data[i][8],
   Discontinued:data[i][9]
  
};

firestore.createDocument("Products/", dataToImport[ProductID + '-' + ProductName]);
// Logger.log(dataToImport);
}
}