//Here is the exmaple from the curriculum of node lesson 
//describe('Shopping List', function() {
//     it('should list items on get');
//     it('should add an item on post');
//     it('should edit an item on put');
//     it('should delete an item on delete');
// });

// Try It!

// Add extra it statements to your test suite to cover any edge cases in your code. Testing is good to ensure that your code does what you expect when it is used correctly, but also good to test when it's not. For example, you could add a test to make sure that the correct action is taken when you try to delete an item which doesn't exist.

// Stub the following tests:

// POST to an ID that exists
// POST without body data
// POST with something other than valid JSON
// PUT without an ID in the endpoint
// PUT with different ID in the endpoint than the body
// PUT to an ID that doesn't exist
// PUT without body data
// PUT with something other than valid JSON
// DELETE an ID that doesn't exist
// DELETE without an ID in the endpoint
// Try to think of any additional edge cases which could occur. If you can think of any extra edge cases then add additional stubs for them.

// As you can see, writing tests for all this will save you time from doing it manually, as well as help you think through ways that a user (or hacker) may do unexpected things to break your app.

//From here on the top is the Try It!
describe('Shopping List', function() {
    it('should list items on get');
    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
//It ends here and the rest is on the bottom.
    it('should not post to an id that exists');
    it('should not post without body data');
    it('should not post with something other than valid json');
    it('should not put without an id in the endpoint');
    it('should not put with different id in the endpoint than the body');
    it('should not put to an id that doesnt exist');
    it('should not put without body data');
    it('should not put with something other than valid json');
    it('should not delete an id that doesn\'t exist');
    it('should not delete without an id at the endpoint');
});