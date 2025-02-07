// Background for the content div

function getContentBackgroundColor(originalBodyBg) {
    const hasOriginalBodyBg = originalBodyBg !== 'rgba(0, 0, 0, 0)' && originalBodyBg !== 'transparent';
    if (hasOriginalBodyBg) {
        return originalBodyBg;
    }

    const html = document.documentElement;    
    const htmlStyle = window.getComputedStyle(html);
    const htmlHasBackground = htmlStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                             htmlStyle.backgroundColor !== 'transparent';    
    if (htmlHasBackground) {
        return htmlStyle.backgroundColor;
    }

    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    const bodyHasBackground = bodyStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                             bodyStyle.backgroundColor !== 'transparent';
    if (bodyHasBackground) {
        return bodyStyle.backgroundColor;
    }

    return 'rgba(255, 255, 255, 1)';
}






// Background for the parent div + menu

function getColorFromFavicon(faviconUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = function() {
            try {
                const colorThief = new ColorThief();
                const color = colorThief.getColor(img);
                const hslColor = rgbToHsl(color[0], color[1], color[2]);
                resolve(hslColor);
            } catch (e) {
                reject(e);
            }
        };
        
        img.onerror = () => {
            reject(new Error('Failed to load favicon'));
        };
        
        img.src = faviconUrl;
    });
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [
        Math.round(h * 360),
        Math.round(s * 100),
        Math.round(l * 100)
    ];
}

function adjustLightness(h, s, l, adjustment) {
    const newLightness = Math.max(0, Math.min(100, l + adjustment));
    return [h, s, newLightness];
}

function getHSLAString(h, s, l, a = 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}


function getColorsFromHSL(h, s, l) {
    const maxLightness = 30;
    const minLightness = 10;
    if (l > maxLightness) {
        const adjustedLightness = l - maxLightness;
        const baseColor = adjustLightness(h, s, l, -adjustedLightness);
        const menuColor = adjustLightness(baseColor[0], baseColor[1], baseColor[2], -20);
        return {
            parentColor: getHSLAString(...baseColor), 
            menuColor: getHSLAString(...menuColor, 0.8)
        };
    }
    if (l < minLightness) {
        const baseColor = adjustLightness(h, s, l, 20);
        const menuColor = adjustLightness(baseColor[0], baseColor[1], baseColor[2], -20);
        return {
            parentColor: getHSLAString(...baseColor), 
            menuColor: getHSLAString(...menuColor, 0.8)
        };
    }
    return {
        parentColor: getHSLAString(h, s, l), 
        menuColor: getHSLAString(h, s, l - 20, 0.8)
    };
}


async function getBackgroundColor() {
    try {
        const faviconUrl = getFaviconUrl();
        const faviconColorHSL = await getColorFromFavicon(faviconUrl);
        const colors = getColorsFromHSL(...faviconColorHSL);
        return colors;
    } catch (error) {
        console.log('Error getting favicon color, falling back to background check:', error);
        return getColorsFromHSL(40, 40, 40);
    }
}