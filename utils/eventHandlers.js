function addEventListeners() {
    document.addEventListener('keydown', handleEscapeKey);
}

function removeEventListeners() {
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape' && window.isSimulatorActive) {
        toggleSimulator();
    }
}