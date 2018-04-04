#!/bin/sh

zip -r -FS ../my-extension.xpi \
    icons/logo-*.png \
    main.js \
    main.css \
    manifest.json \
    settings.html \
    settings.js \
    LICENSE