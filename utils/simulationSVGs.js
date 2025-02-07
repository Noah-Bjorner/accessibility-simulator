const simulationSVGFilters = `
<svg style="display: none;">
  <defs>
      <!-- Deuteranopia (red-green color blindness) -->
    <filter id="deuteranopia">
      <feColorMatrix type="matrix" values="
        0.367 0.861 -0.228 0 0
        0.280 0.673 0.047 0 0
        -0.012 0.043 0.969 0 0
        0 0 0 1 0"
      "/>
    </filter>

    <!-- Tritanopia (blue-yellow color blindness) -->
    <filter id="tritanopia">
      <feColorMatrix type="matrix" values="
        1.255 -0.077 -0.178 0 0
        -0.078 0.931 0.148 0 0
        0.004 0.691 0.305 0 0
        0 0 0 1 0"
      />
    </filter>

    <!-- Achromatopsia (complete color blindness) -->
    <filter id="achromatopsia">
      <feColorMatrix type="matrix" values="
        0.299 0.587 0.114 0 0
        0.299 0.587 0.114 0 0
        0.299 0.587 0.114 0 0
        0 0 0 1 0"
      />
    </filter>

    <!-- Reduced Contrast -->
    <filter id="reduced-contrast">
      <feComponentTransfer>
        <feFuncR type="linear" slope="0.3" intercept="0.35"/>
        <feFuncG type="linear" slope="0.3" intercept="0.35"/>
        <feFuncB type="linear" slope="0.3" intercept="0.35"/>
      </feComponentTransfer>
      <feColorMatrix type="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.7 0"
      />
    </filter>

    <!-- Low Quality Display -->
    <filter id="low-quality">
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.85 0.9 1"/>
        <feFuncG type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.85 0.9 1"/>
        <feFuncB type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.85 0.9 1"/>
      </feComponentTransfer>
      <!-- Minimal blur -->
      <feGaussianBlur stdDeviation="0.2"/>
      <!-- Very slight color adjustment -->
      <feColorMatrix type="matrix" values="
        0.98 0   0    0   0
        0    0.98 0    0   0
        0    0    0.98 0   0
        0    0    0    1   0"
      />
    </filter>

  </defs>
</svg>
`;

function applySVGFilter(element, filterId) {
    // First make sure the SVG filters are injected
    const overlay = document.getElementById('simulator-vision-overlay');
    if (overlay && !overlay.querySelector('svg')) {
        overlay.innerHTML = simulationSVGFilters;
    }
    // Apply the filter
    element.style.backdropFilter = `url(#${filterId})`;
}