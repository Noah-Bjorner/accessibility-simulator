
chrome.action.onClicked.addListener(async (tab) => {
    try {
        if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
            try {
                await chrome.tabs.sendMessage(tab.id, { action: 'ping' });
            } catch (err) {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: [
                        'lib/color-thief.min.js',
                        'utils/currentSite.js',
                        'utils/colors.js',
                        'utils/simulationSVGs.js',
                        'utils/simulations.js',
                        'utils/eventHandlers.js',
                        'utils/uiComponents.js',
                        'utils/wrapperManager.js',
                        'content.js'
                    ]
                });
                await chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    files: ['content.css']
                });
            }
            chrome.tabs.sendMessage(tab.id, {
                action: 'toggleSimulator'
            });
        }
    } catch (err) {
        console.error('Failed to inject script', err);
    }
}); 