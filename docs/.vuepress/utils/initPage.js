const fs = require('fs');
// 排除检查的文件
let excludes = ['.DS_Store'];

let filehelper = {
  getFileName: function(rpath,otherPath) {
    let filenames = [];
    let fileTypes = /\.md$/; //只匹配以md结尾的文件
    fs.readdirSync(rpath).forEach((file) => {
      if (excludes.indexOf(file) < 0) {
        fullpath = rpath + '/' + file;
        let fileinfo = fs.statSync(fullpath);
        if (fileinfo.isFile()) {
          if (fileTypes.test(file) > 0) {
            if (file === 'README.md') {
              file = '';
            } else {
              file = file.replace('.md', '');
            }
            file = otherPath ? otherPath + file : file
            filenames.push(file);
          }
        }
      }
    });
    filenames.sort(); // 排序
    return filenames;
  },
};
module.exports = filehelper;