const path=require('path');

module.exports=path.dirname(process.mainModule.filename); //at the end gives 5
console.log('yes its 5'+path.dirname(process.mainModule.filename))
//dirname :return the directory name of a path
//main module is the file that that started  your app :index.js
//file name : to find out which file this module was spun up /collected =>the root /parent
//يعني بشوف الفايل بتاعي الي بيرن البروجيكت كله واشوف الروت بتاعه احفظ ال باس بتاعه