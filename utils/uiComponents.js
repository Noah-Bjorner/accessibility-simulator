function createSimulatorMenu(bgColor) {
    const fragment = document.createDocumentFragment();
    
    const menuWrapper = document.createElement('div');
    menuWrapper.id = 'simulator-menu-wrapper';

    const menuBar = document.createElement('div');
    menuBar.id = 'simulator-menu';
    menuBar.style.backgroundColor = bgColor;

    const buttonFragment = document.createDocumentFragment();
    visionSimulations.forEach((simulation, index) => {

        const button = document.createElement('button');
        button.textContent = simulation.name;
        button.className = `simulator-menu-button${index === 0 ? ' active' : ''}`;
        
        button.addEventListener('click', () => {
            document.querySelectorAll('.simulator-menu-button')
                .forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const contentDiv = document.querySelector('#simulator-content');
            applyVisionSimulation(simulation.name, contentDiv);
        });
        
        buttonFragment.appendChild(button);
    });

    menuBar.appendChild(buttonFragment);
    menuWrapper.appendChild(menuBar);
    fragment.appendChild(menuWrapper);
    
    return fragment;
}


function createSimulatorHeader() {
    const fragment = document.createDocumentFragment();
    
    const containers = {
        headerWrapper: document.createElement('div'),
        header: document.createElement('div'),
        leftSection: document.createElement('div'),
        leftSectionText: document.createElement('div')
    };

    const content = {
        siteIcon: document.createElement('img'),
        siteName: document.createElement('span'),
        serviceName: document.createElement('span'),
        closeButton: document.createElement('button')
    };

    containers.headerWrapper.id = 'simulator-header-wrapper';
    containers.header.id = 'simulator-header';
    containers.leftSection.id = 'simulator-header-left';
    containers.leftSectionText.id = 'simulator-header-left-text';

    const siteInfo = getCurrentSiteInfo();
    
    content.siteIcon.src = siteInfo.favicon;
    content.siteIcon.alt = 'icon';
    content.siteIcon.id = 'simulator-header-site-icon';

    content.siteName.id = 'simulator-header-left-site-name';
    content.siteName.textContent = siteInfo.name;

    content.serviceName.id = 'simulator-header-left-service-name';
    content.serviceName.textContent = '/ Accessibility Simulator';

    const closeButtonText = "Exit";
    content.closeButton.id = 'simulator-header-close-button';
    content.closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#000000" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg><span id="simulator-header-close-button-text">${closeButtonText}</span>`;
    content.closeButton.addEventListener('click', toggleSimulator);

    containers.leftSectionText.append(content.siteName, content.serviceName);
    containers.leftSection.append(content.siteIcon, containers.leftSectionText);
    containers.header.append(containers.leftSection, content.closeButton);
    containers.headerWrapper.appendChild(containers.header);
    fragment.appendChild(containers.headerWrapper);

    return fragment;
}




