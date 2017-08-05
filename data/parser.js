let parse = require('csv-parse');
let fs = require('fs');
let compact = require('lodash/compact');
let path = require('path')

let addressesFilePath = path.resolve(__dirname, './addresses.csv');
let candidatesFilePath = path.resolve(__dirname, './candidates.csv');
let variantsFilePath = path.resolve(__dirname, './variants.csv');

let addressesFile = fs.readFileSync(addressesFilePath);
let variantsFile = fs.readFileSync(variantsFilePath);
let candidatesFile = fs.readFileSync(candidatesFilePath);

let addresses, variants, candidates;

function addressParser(data) {
  return {
    id: data[0],
    streetName: data[1],
    building: data[2],
    votingOptions: data[3]
  }
}

function votingOptionsParser(data) {
  return {
    id: data[0],
    district: data[1],
    candidates: compact(data.slice(2, 7)),
    pollingStationId: data[7],
    pollingStationAddress: data[8]
  }
}

function candidatesParser(data) {
  return {
    id: data[0],
    firstName: data[2],
    lastName: data[1],
    link: data[3]
  }
}


parse(addressesFile, {from: 2}, (err, output) => {
  addresses = {
    addresses: output.map(data => addressParser(data))
  };
  fs.writeFileSync(path.resolve(__dirname,'./addresses.json'), JSON.stringify(addresses, null, 2), 'utf8');
});

parse(variantsFile, {from: 2}, (err, output) => {
  variants = output.map(data => votingOptionsParser(data));
  fs.writeFileSync(path.resolve(__dirname, './variants.json'), JSON.stringify(variants, null, 2));
});

parse(candidatesFile, {from: 2}, (err, output) => {
  candidates = output.map(data => candidatesParser(data));
  fs.writeFileSync(path.resolve(__dirname, './candidates.json'), JSON.stringify(candidates, null, 2));
});
