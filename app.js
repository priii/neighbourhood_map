// to display the list of restaurants
// followed the following demo
// http://opensoul.org/2011/06/23/live-search-with-knockoutjs/

var restaurants = [
  { name: "Orean's Hummus",
    caption: "Cozy Mediterranean restaurant"
  },
  {
    name:"Taqueria La Espuela",
    caption:"Mexican staples"
  },
 {
   name: "Niji Sushi",
   caption:"Informal, bustling Japanese eatery"
 },
 {
   name:"Crepevine",
   caption:"sweet & savory crêpes."
 },
 {
   name:"Xanh Restaurant",
   caption:"High-end Vietnamese dishes"
    }
];

var viewModel = {
  restaurants: ko.observableArray(restaurants)
};
ko.applyBindings(viewModel);
