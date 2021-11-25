/*
Comsc230 - Group Project : Migrate Northwind Traders SQL Database to Google Cloud Firestore

Preliminary:

1. Clone the repo from: https://github.com/rhodyapps/Comsc230-SQL
2. Set up XAMPP and import the 'northwind' database from the 'nothwind_database.sql' file in the repo
3. Export CSV files for each of the tables in the database
4. Create a Google Sheet and import each of the CSV files 
*Note: Once you have the first sheet, use 'Insert Into' to import the other sheets into the SpreadSheet.
5. Create a Firestore Project 'NorthwindTraders' and enable anonymous login
7. In Firestore > Project Settings > Service Accounts generate a service account and store it in a secure file on your laptop
.  ** Do not include your service account file or data in a Github project **
8. Copy and past the email, key , and projectId into the appropriate fields in the App Script functions (below)
9. Add the FirestoreApp library:
      - In Google Sheet select Tools>Script Editor
     select Resources >the "Add a library" 
     enter the following id in the input box

     1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw

     click "Add." and choose the most recent version number.

10. Learn more about working with Google Sheets at:

 Google Developer Documentation : Spreadsheet Service
 https://developers.google.com/apps-script/reference/spreadsheet

*/ 

// Activate sheet by Name
function activateSheetByName(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  sheet.activate();
  return sheet;
}


// Test Firestore Connection & Authentication

function testFirestore() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
var firestore = FirestoreApp.getFirestore(email, key, projectId);
const data = {
"name": "test!"
}

firestore.createDocument("TestCollection/FirstDocument", data)
Logger.log(data);
}

// Write Data to Firestore

// Notes: You will need to add the Firestore APP Library and set the version level
//    click Resources > Add a Library > paste in this string: 
// 1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw 
//.                   select the latest version from the dropdown


//. GCP Firestore billing is based on the Usage (reads and writes) You are allowed 
//. visit https://firebase.google.com/docs/firestore/quotas to learn more about free-tier usage

// To stay within the free-tier limits,  export a limited numdber of documents while you are working out the data field names and values
// You can do this by changing the loop counter (in the example below I use 10)
// You can get the whole set of documents by using the data.length object as the loop counter limit
//  once you have the data migrating from the Google Sheet to Firestore. Below is the code for a loop using the data.length object

// for(var i = 1; i < data.length; i++) {

// -------  Write Customer Data to Firestore --------------------------------------------------

function writeCustomerDataToFirebase() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
  
var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var sheetName = 'customers';
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
var ss = SpreadsheetApp.openByUrl(url);
// var sheet = ss.getSheets()[0];
// var sheet = ss.getSheetByName(sheetName);
  var sheet = activateSheetByName(sheetName);
  Logger.log(sheetName);
var data = sheet.getDataRange().getValues();
var dataToImport = {};
// Logger.log(data.length);
  
// CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax
  // for(var i = 1; i < data.length; i++) {
  
for(var i = 1; i < 10; i++) {
var CustomerID = data[i][0];
var CompanyName = data[i][1];
  Logger.log(CustomerID + '-' + CompanyName);
dataToImport[CustomerID + '-' + CompanyName] = {
CustomerID: CustomerID,
CompanyName: CompanyName,
ContactName:data[i][2],
ContactTitle:data[i][3],
Address:data[i][4],
City:data[i][5],
  Region:data[i][6],
PostalCode:data[i][7],
Country:data[i][8],
Phone:data[i][9],
Fax:data[i][10]
};
firestore.createDocument("Customers2/", dataToImport[CustomerID + '-' + CompanyName]);
// Logger.log(dataToImport);
}
}

// --------------- Write Employee Data to Firestore ---------------------------------

function writeEmployeeDataToFirebase() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Employees
  // EmployeeID, LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Address, City, Region, PostalCode, Country, HomePhone, Extension, Photo, Notes, ReportsTo

  var sheetName = 'employees';
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
 var EmployeeID = data[i][0];
 var LastName = data[i][1];
Logger.log(EmployeeID + '-' + LastName);
 dataToImport[EmployeeID + '-' + LastName] = {

   EmployeeID: data[i][0],
   LastName:data[i][1],
   FirstName:data[i][2],
   Title:data[i][3],
   TitleOfCourtesy:data[i][4],
   BirthDate:data[i][5],
   HireDate:data[i][6],
   Address:data[i][7],
   City:data[i][8],
   Region:data[i][9],
   PostalCode:data[i][10],
   Country:data[i][11],
   HomePhone:data[i][12],
   Extension:data[i][13],
   Photo:data[i][14],
   Notes:data[i][15],
   ReportsTo:data[i][6]
};

firestore.createDocument("Employees/", dataToImport[EmployeeID + '-' + LastName]);
// Logger.log(dataToImport);
}
}


// --------------- Write Suppliers Data to Firestore ---------------------------------

function writeSuppliersDataToFirebase() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Suppliers
  // SupplierID	CompanyName	ContactName	ContactTitle	Address	City	Region	PostalCode	Country	Phone	Fax	HomePage
  
  var sheetName = 'suppliers';
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
 var SupplierID = data[i][0];
 var CompanyName = data[i][1];
Logger.log(SupplierID + '-' + CompanyName);
 dataToImport[SupplierID + '-' + CompanyName] = {

   SupplierID:data[i][0],
   CompanyName:data[i][1],
   ContactName:data[i][2],
   ContactTitle:data[i][3],
   Address:data[i][4],
   City:data[i][5],
   Region:data[i][6],
   PostalCode:data[i][7],
   Country:data[i][8],
   Phone:data[i][9],
   Fax:data[i][10],
   HomePage:data[i][11]
   
};

firestore.createDocument("Suppliers/", dataToImport[SupplierID + '-' + CompanyName]);
// Logger.log(dataToImport);
}
}


// ---------------- Write Shippers Data to Firestore --------------

function writeShippersDataToFirebase() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Shippers
  // ShipperID	CompanyName	Phone
  
  var sheetName = 'shippers';
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = activateSheetByName(sheetName);
Logger.log(sheetName);
  
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  
// Logger.log(data.length); // the number of rows in the sheet
  
  // Use this loop code if you want all rows in the sheet: 
  //   for(var i = 1; i < data.length; i++) {
  
for(var i = 1; i < data.length; i++) { 
 var ShipperID = data[i][0];
 var CompanyName = data[i][1];
Logger.log(ShipperID + '-' + CompanyName);
 dataToImport[ShipperID + '-' + CompanyName] = {

   ShipperID:data[i][0],
   CompanyName:data[i][1],
   Phone:data[i][2]   
};

firestore.createDocument("Shippers/", dataToImport[ShipperID + '-' + CompanyName]);
// Logger.log(dataToImport);
}
}

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

//-------------------- Write Orders Data to Firestore -------------

function writeOrdersDataToFirebase() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Orders
  // OrderID	CustomerID	EmployeeID	OrderDate	RequiredDate	ShippedDate	ShipVia	Freight	ShipName	ShipAddress	ShipCity	ShipRegion	ShipPostalCode	ShipCountry
  
  var sheetName = 'orders';
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
 var OrderID = data[i][0];
 var CustomerID = data[i][1];
Logger.log(OrderID + '-' + CustomerID);
 dataToImport[OrderID + '-' + CustomerID] = {

   OrderID:data[i][0],
   CustomerID:data[i][1],
   EmployeeID:data[i][2],
   OrderDate:data[i][3],
   RequiredDate:data[i][4],
   ShippedDate:data[i][5],
   ShipVia:data[i][6],
   Freight:data[i][7],
   ShipName:data[i][8],
   ShipAddress:data[i][9],
   ShipCity:data[i][10],
   ShipRegion:data[i][11],
   ShipPostalCode:data[i][12],
   ShipCountry:data[i][13]

};

firestore.createDocument("Orders/", dataToImport[OrderID + '-' + CustomerID]);
// Logger.log(dataToImport);
}
}

// ------------------ Write Orders Details Data to Firestore -----------

function writeOrderDetailsDataToFirebase() {
  var email = "firebase-adminsdk-k3oaa@gknorthwindtraders.iam.gserviceaccount.com";
  var key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/qv9dsx68k2Or\n08ZMLYP8BfmywtXzItNDWLC3k/YF18PgbED4lC/kpl/DLycss6y/znIFE2qLYXH7\n2vHkjawxiSXCQ4EDbsNHVO+TRtd6gHKt+n7lBPwZpSmLNQwpWWfJFEj7O6xu8dJp\nYEnVh31gRNm5AX+kkp0oBiixU/RhEJLh3ycQesxhgldm56jTCDxz5M3vWs0DZ7yp\n0ZqBuvdwzu4n17l38YOiCwvwTIwrswRk1LRZNaucb17BqHrAP//4gINNqjsFJmK7\nzj+WW83q0GDer+VA7NqRW1HG7XBfITNw3RLZmmkxNzYt1SEyqZXwP2jUmyUOmZPy\nQFEOzyyBAgMBAAECggEAES6QE+NBxx/jWHz0ktGluksC1l6W9WPS0n+538sYy+9K\ntOyfamlGXdX4UbQBbAVzYAJuwDu8WmBS6oP3GUkF/a7Qvrh0cU1VnihkDazVFjs7\njJMfGwK2Ysomjj8kJvTH1APIgxUXYR62gRHLrKOnvqCNcANNYQBvrC3ZKgRfrO+6\napO2EuV2BYfc/XNG6TLoT4mTOu73gDQZyYOZgMf/rnPyEBPGhVoY3SmbDEic02zW\n5N9jWYO0R4LAGHEPqgFZCs0JKeh9FEwF+sbs5rxBBsqRTQNBoL4yWLsMAyWJ9f4X\nFNEW8X1ngzkykA6Zfo8M3yO38K6geZLyeFVu+VryzQKBgQD5zV+RT6MwT5uM7D1u\n1fvObyvI6yflHZLVQWYk6BxzvOGmx/cehPz+dwkDmMh9jQXyNTTgx+pGvicXN1d5\nIX4h+BQQAfgskKou+t88+UwO1k8RT5ZT9BvMXy360O1cy9Qdk4AY2PdzMreNUVXB\nMZJvOMe3N0Ug8GbdqceGzLwhnwKBgQDEbGHtDNATKMh75pZXP/F6gUN3PxpawK4U\nWZZsTVeOGPLgn/uCGyW/+3KerbiPQADZ0C8W8Bw2O/dV0wkPbivWlmdPZIxST0/J\nqJRjqyxBJd2NzTZ5HcOLII5N2G7LZJZJjE6mqbC694oVTpytNhjJzsER2mcXJrhl\nhwFh8zU93wKBgQCP6lc9w3DT+3k1ZkE6YsOwufGyzm/smu4mOIhdiPAjadVjHd9s\nUNfkzrV9wf73/lBHq4msWuDJIvIoePTHT5l4fpEoa8oL+shhSp1kZogAIE3rPjvw\nYDnHs6osz0OA69lntLvfFNjzIGwJWaubIzEnLMI69ve3s2jAGfle2wMkJwKBgEi4\n9+iT/dWaG+ADl1XmTrlUcm4L5u4CuHDAWnjuiaQKiKGxmaSp+GgD6IPnPZWL1MTP\n1x9e9pL90Kzt3UThPUnNlaJHT8yJoLjAuW/NSC02n7iIacqdwnAYNZeMsjiLnTjN\nwbDi0pPmYjFRUaCvjq3o5oJ9of1oUI0GVvS03tlxAoGBAIIifvs60wvqIpfEla3c\nqY/j+3GxKTKX1W9nD/cZTc2sWaurB8NvSah4mtIYsO0pkLrUqS0e3e+4OXV3HfD7\nIOa24+47ZXCHzEHdcxjLdMGVyCflRl/9wQTYIOhmwC5Z/mFJ03h1gsF+L9MQK/48\nj/V4Rk+74FGuirmvjIv4xr6T\n-----END PRIVATE KEY-----\n";
  var projectId = "gknorthwindtraders";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Order Details
  // ID	OrderID	ProductID	UnitPrice	Quantity	Discount		
  
  var sheetName = 'order_details';
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
 var ID = data[i][0];
 var ProductID = data[i][1];
Logger.log(ID + '-' + ProductID);
 dataToImport[ID + '-' + ProductID] = {

   ID:data[i][0],
   OrderID:data[i][1],
   ProductID:data[i][2],
   UnitPrice:data[i][3],
   Quantity:data[i][4],
   Discount:data[i][5],
   
  
};

firestore.createDocument("OrderDetails/", dataToImport[ID + '-' + ProductID]);
// Logger.log(dataToImport);
}
}

