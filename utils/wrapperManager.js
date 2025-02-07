async function initializeWrapper() {
    try {
        if (window.wrapperDiv) return;

        const fragment = document.createDocumentFragment();

        const colors = await getBackgroundColor();
        const originalBodyBackground = window.getComputedStyle(document.body).backgroundColor;
        const contentBackground = getContentBackgroundColor(originalBodyBackground);

        window.wrapperDiv = document.createElement('div');
        window.wrapperDiv.id = 'accessibility-simulator-wrapper';
        window.wrapperDiv.style.backgroundColor = colors.parentColor;
        
        const contentDiv = document.createElement('div');
        contentDiv.id = 'simulator-content';
        contentDiv.style.backgroundColor = contentBackground;
        
        const visionOverlay = document.createElement('div');
        visionOverlay.id = 'simulator-vision-overlay';
        contentDiv.appendChild(visionOverlay);

        contentDiv.append(...document.body.children);

        const menuBar = createSimulatorMenu(colors.menuColor);
        const header = createSimulatorHeader();
                
        fragment.append(menuBar, header, contentDiv);
        
        window.wrapperDiv.appendChild(fragment);
        document.body.appendChild(window.wrapperDiv);

        window.wrapperDiv.offsetHeight;
        window.wrapperDiv.classList.add('visible');

        requestAnimationFrame(() => {
            const excludeIds = new Set(['simulator-vision-overlay', 'simulator-menu-wrapper', 'simulator-header-wrapper']);
            const elements = contentDiv.getElementsByTagName('*');
            for (const element of elements) {
                if (excludeIds.has(element.id)) continue;
                const computedStyle = window.getComputedStyle(element);
                if (computedStyle.position === 'fixed') {
                    const { top, left, right, bottom } = computedStyle;
                    Object.assign(element.style, {
                        position: 'absolute',
                        top,
                        left,
                        right,
                        bottom
                    });
                }
            };
        });
    } catch (error) {
        console.error('Error initializing wrapper:', error);
        window.wrapperDiv?.remove();
        window.wrapperDiv = null;
    }
}




async function toggleSimulator() {
    window.isSimulatorActive = !window.isSimulatorActive;
    
    if (window.isSimulatorActive) {
        await initializeWrapper();
        addEventListeners();
    } else {
        if (window.wrapperDiv) {        
            removeEventListeners();

            window.wrapperDiv.classList.remove('visible');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const overlays = document.querySelectorAll('#simulator-vision-overlay');
            overlays.forEach(overlay => overlay.remove());            
                
            while (window.wrapperDiv.querySelector('#simulator-content').firstChild) {
                document.body.appendChild(window.wrapperDiv.querySelector('#simulator-content').firstChild);
            }
            window.wrapperDiv.remove();
            window.wrapperDiv = null;
        }
    }
}