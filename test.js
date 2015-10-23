var app = require("./app.js");
var foo = app.foo;

describe("FooTest", () => {
	it("foo", () => {
		foo();
	});
});