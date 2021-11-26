install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8	

watch:
	npx jest --watch
