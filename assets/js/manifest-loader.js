        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            const manifestLink = document.createElement('link');
            manifestLink.rel = 'manifest';
            manifestLink.href = 'manifest.webmanifest';
            document.head.appendChild(manifestLink);
        }
