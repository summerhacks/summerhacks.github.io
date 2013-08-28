#!/bin/bash



# compile the css
mkdir -p $1/css
sass --style compressed ../css/main.sass:$1/css/styles.css

# remove all <script> tags and add another one to js/summerhacks.js
sed -E 's/<script type=[^>]+><\/script>//g' ../index.html |
sed -E 's/<\/head>/<script src="\/js\/summerhacks.js"><\/script><\/head>/g' > $1/index.html

# minify index.html
java -jar htmlcompressor.jar --type html -o $1/index.html ../index.html

# compile the javascripts one by one
mkdir -p $1/js

# cat ../js/raf-shim.js > $1/js/tmp.js
# cat ../js/background.js >> $1/js/tmp.js
# cat ../js/init.js >> $1/js/tmp.js

java -jar yuicompressor.jar ../js/init.js >> $1/js/summerhacks.js
# cat ../js/init.js >> $1/js/summerhacks.js

# clear temporary file
# rm $1/js/tmp.js

# fallback. copy javascripts
cp -r ../js $1/

# copy images
cp -r ../images $1/