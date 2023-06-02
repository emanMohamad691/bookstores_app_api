
//generate random store code
var randomstring = require("randomstring");
exports.generationStoreCode=()=>{
return randomstring.generate({
  length: 5,
  charset: 'alphabetic',
  capitalization:"uppercase"
});
}