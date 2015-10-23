require("source-map-support").install();

function foo() {
	console.trace();
}
exports.foo = foo;
