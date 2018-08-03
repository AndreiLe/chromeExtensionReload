const Utils = {};

Utils.initExtension = function (name) {
  chrome.runtime.sendMessage("init-extension", function (response) {
  });
};

export default Utils;
