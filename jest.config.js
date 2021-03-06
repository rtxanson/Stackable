const test = require( '@wordpress/jest-preset-default/jest-preset.json' )
const { omit } = require( 'lodash' )
const path = require( 'path' )

module.exports = {

	// Remove deprecated: Option 'setupTestFrameworkScriptFile' was replaced by configuration 'setupFilesAfterEnv', which supports multiple paths.
	...omit( test, 'setupTestFrameworkScriptFile' ),

	rootDir: path.resolve( __dirname ),

	// Override the setup with some of our own stuff.
	setupFilesAfterEnv: [
		'<rootDir>/src/test/setup-test-framework.js',
	],

	// Custom mappers.
	moduleNameMapper: {
		'^@stackable(.*)$': '<rootDir>/src$1',
		'.s?css$': '<rootDir>/src/test/scss-stub.js',
		'.(png|jpg|gif)$': '<rootDir>/src/test/image-stub.js',
		'.svg$': '<rootDir>/src/test/svgr-mock.js',
		stackable: '<rootDir>/src/test/stackable-mock.js',
	},

	// Ignore Unexpected identifiers in node_modules/simple-html-tokenizer/dist/es6/tokenizer.js
	transformIgnorePatterns: [
		'<rootDir>/node_modules/(?!simple-html-tokenizer)',
	],

	// All relevant code should be included in coverage.
	collectCoverageFrom: [
		'src/(block|components|icons|welcome)/**/*.js',
		'!src/block/ghost-button/**/*', // Deprecated block, don't test anymore.
		'!src/block/pullquote/**/*', // Deprecated block, don't test anymore.
	],

	testMatch: [ '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)' ],
}
