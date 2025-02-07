function getCurrentSiteInfo() {
    return {
        name: document.title,
        favicon: getFaviconUrl(),
    };
}

function getFaviconUrl() {
    // Try to get high quality favicon first
    const links = document.querySelectorAll('link[rel*="icon"]');
    for (const link of links) {
        if (link.href) {
            return link.href;
        }
    }
    // Fallback to default favicon
    const defaultFavicon = window.location.origin + '/favicon.ico';
    return defaultFavicon;
}