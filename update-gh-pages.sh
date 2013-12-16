#!/bin/bash

GH_DIR="../jquery.mosaicflow_gh-pages/"
SCRIPT="jquery.mosaicflow.min.js"

echo "Updating Mosaic Flow on gh-pages…"

grunt build
cp "$SCRIPT" "$GH_DIR/src/"
pushd "$GH_DIR"
git commit -m "Update version." "src/$SCRIPT"
git push
popd
