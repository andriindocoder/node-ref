const fs = require("fs");
const request = require("request-promise-native");

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

downloadPDF("https://www.toyota.com/t3Portal/document/om-s/OM02580U/pdf/OM02580U.pdf", "./public/somePDF.pdf");