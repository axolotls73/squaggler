
(function() {

  function processNode(node) {
    console.log("processing: " + node.tagName);
    let parent = node.parentElement;
    while (parent && parent !== document.body) {
      const tagName = parent.tagName.toUpperCase();
      if (tagName === 'A' || tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'NOSCRIPT' || tagName === 'CODE' || tagName === 'PRE') {
        return;
      }
      parent = parent.parentElement;
    }

    console.log(node.nodeValue);
    node.nodeValue = 'a' + node.nodeValue;
  }

  function walkAndSquaggle(rootNode) {
    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT, // only text nodes
      null,
      false
    );

    let node;
    const nodesToProcess = [];
    while ((node = walker.nextNode())) {
      nodesToProcess.push(node);
    }

    nodesToProcess.forEach(processNode);
  }

  // run squaggler
  walkAndSquaggle(document.body);

})();
