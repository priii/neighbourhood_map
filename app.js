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


var viewModel = {
  //restaurants: ko.observableArray(restaurants),
  query: ko.observable('')
};
  //search function
  // followed the below demo for search method
  // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  // http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
viewModel.restaurants = ko.computed(function(){
  var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(restaurants, function(restaurant){
        return restaurant.name.toLowerCase().indexOf(search)>=0;
    });

},viewModel);
  ko.applyBindings(viewModel);
