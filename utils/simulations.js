const visionSimulations = [
    {
        name: 'Normal',
        id: 'normal',
        applyEffect: (element) => {
            element.style.backdropFilter = 'none';
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    },
    {
        name: 'Red-Green Color Blindness',
        id: 'red-green-colorblind',
        applyEffect: (element) => {
            applySVGFilter(element, 'deuteranopia');
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    },
    {
        name: 'Yellow-Blue Color Blindness',
        id: 'yellow-blue-colorblind',
        applyEffect: (element) => {
            applySVGFilter(element, 'tritanopia');
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    },
    {
        name: 'Color Blindness',
        id: 'total-colorblind',
        applyEffect: (element) => {
            applySVGFilter(element, 'achromatopsia');
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    },
    {
        name: 'Low Contrast Vision',
        id: 'low-contrast',
        applyEffect: (element) => {
            applySVGFilter(element, 'reduced-contrast');
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    },
    {
        name: 'Blurred Vision',
        id: 'blurred',
        applyEffect: (element) => {
            element.style.backdropFilter = 'blur(1.5px)';
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    },
    {
        name: 'Sunshine',
        id: 'bright',
        applyEffect: (element) => {
            element.style.backdropFilter = 'brightness(250%)'
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    },
    {
        name: 'Low-Quality Device',
        id: 'low-quality',
        applyEffect: (element) => {
            applySVGFilter(element, 'low-quality');
        },
        removeEffect: (element) => {
            element.style.backdropFilter = 'none';
        }
    }
];


function applyVisionSimulation(simulationName, element) {
    const simulation = visionSimulations.find(simulation => simulation.name === simulationName);
    if (simulation) {
        element.style.backdropFilter = 'none';        
        const overlay = document.getElementById('simulator-vision-overlay');
        if (overlay) {
            simulation.applyEffect(overlay);
        }
    }
}