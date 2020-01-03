#!/bin/bash
OUT=out.txt
EXP=./expected_out.txt

DIFF=$(diff --unified --ignore-case $EXP $OUT)
echo ''
if [ "" == "$DIFF" ]; then
    echo '####################################'
    echo '#          RESULT: success         #'
    echo '####################################'
else
    echo '####################################'
    echo '#           TEST ERRORS:           #'
    echo '####################################'
    diff --unified --ignore-case $EXP $OUT
fi
