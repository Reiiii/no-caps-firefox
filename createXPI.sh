#!/bin/sh

zip -r -FS ../my-extension.xpi \
    icons/logo-*.png \
    main.js \
    manifest.json \
    settings.html \
    settings.js \
    LICENSE