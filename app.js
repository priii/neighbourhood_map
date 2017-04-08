// to display the list of restaurants

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

// followed the below demo for search method
// http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
var viewModel = {
  restaurants: ko.observableArray(restaurants),
  query: ko.observable(''),
  //search function
  search: function(value) {
    //remove all the current restaurants, which removes from the view
    viewModel.restaurants.removeAll();
    for(var x in restaurants) {
      if(restaurants[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0){
        viewModel.restaurants.push(restaurants[x]);
      }
    }
  }
};
viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel);
