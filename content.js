if (window.hasRun) {
    throw new Error('Content script has already been injected');
}

window.hasRun = true;
window.isSimulatorActive = window.isSimulatorActive || false;
window.wrapperDiv = window.wrapperDiv || null;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'ping') {
        sendResponse({ status: 'alive' });
        return true;
    }
    if (request.action === 'toggleSimulator') {
        await toggleSimulator();
        return true;
    }
    return true;
}); 
