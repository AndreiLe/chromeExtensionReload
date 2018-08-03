function initExtension(sender) {
  const myid = chrome.runtime.id;
  const tabId = sender.tab.id;

  if (tabId) {
    chrome.storage.sync.get([myid], function(result) {
      let extStorage = {
        [myid]: { 'time': 0, 'tabIds': [] } };
      if (Object.keys(result).length !== 0) {
        extStorage = result;
      }
      let tabIds = extStorage[myid].tabIds
      if (!Array.isArray(tabIds)) {
        tabIds = []
      }
      if (tabIds.indexOf(tabId) < 0) {
        tabIds.push(tabId);
      }
      extStorage[myid].tabIds = tabIds;
      chrome.storage.sync.set(extStorage);
    });

    chrome.pageAction.show(tabId);
    chrome.pageAction.setIcon({ path: './icons/icon32.png', tabId: tabId });
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == "init-extension") {
    initExtension(sender);
  }
});


connectToLivereload();

function connectToLivereload() {
  console.log('background.js - connectToLivereload');

  const connection = new WebSocket('ws://localhost:8081/sockjs-node/websocket');

  connection.onerror = function(error) {
    console.log('reload connection got error:', error);
  };

  connection.onmessage = function(e) {
    if (e.data) {
      const data = JSON.parse(e.data);

      if (data && data.type === 'ok') {
        let reloadTime = 0;
        const myid = chrome.runtime.id;

        chrome.storage.sync.get([myid], function(result) {
          const myid = chrome.runtime.id;
          reloadTime = (result[myid]) ? result[myid].time : 0;
          const tabIds = (result[myid]) ? result[myid].tabIds : 0;
          let time = Date.now();
          const delta = time - reloadTime;
          console.log('reload extension delta is: ' + delta);

          if (delta > 5000 || reloadTime == 0) {
            reloadTime = time;
            const myid = chrome.runtime.id;

            chrome.storage.sync.set({
                [myid]: { 'time': time, 'tabIds': tabIds } },
              function(e) {
                for (let i = 0, tabIdLength = tabIds.length; i < tabIdLength; i++) {
                  chrome.tabs.reload(tabIds[i]);
                }
                chrome.runtime.reload();
              });
          }
        });
      }
    }
  };
}

chrome.tabs.onRemoved.addListener(function(tabId, info) {
  const myid = chrome.runtime.id;
  if (tabId) {
    chrome.storage.sync.get([myid], function(result) {
      if (Object.keys(result).length === 0) {
        return;
      }
      const extStorage = result;
      const tabIds = extStorage[myid].tabIds
      if (!Array.isArray(tabIds)) {
        return;
      }
      const index = tabIds.indexOf(tabId)
      if (index < 0) {
        return;
      }
      tabIds.splice(index, 1);
      extStorage[myid].tabIds = tabIds;
      chrome.storage.sync.set(extStorage);
    });
  }

});