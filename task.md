# The Task

We'd like you to extend the front end application we've provided in this directory utilising the backend apis documented in the README.md

We would like the following functionality implemented:

Items can be added to and removed from the basket (ok)
The quantity of an item in the basket can be increased and decreased (ok)
A dynamic list of items in the user's current basket is displayed on the page. (ok)

## Questions
Please answer the following questions: 

- What questions would you ask of the Product Owner in attempting to understand the scope of the requirements behind the above functionality?
    - Should I let the user decrement the number of items in the basket or only allow to be until it reach 1 and let they use only the remove button (probably to avoid too much logic, like the ones I did, for example);
    - Should we have a clear button to remove all items from the basket?
    - Should we instead adding/removing allow the user to type the quantity of items that he wants to add in the checkout?

- What would you add to your solution if you had more time? If you didn't have as much time as you would have like to on the coding test then use this as an opportunity to explain what you would add.
    - Add a clear all button to remove all the items from the basket;
    - Add a localStorage/sessionStorage solution to retrieve the values previously stored with the cartId and calling the backend to get it;

What assumptions or decisions did you make during your implementation and why did you make them?
- Assumed it was to show the product name;
- Assumed user would use the same 'add' button to increment if already in the basket;
- Assumed we need to show the quantity;

How have you gained confidence that your implementation is correct?
-  By reading the functionalities I had to check the back-end documentation