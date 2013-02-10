/**
 * Created with IntelliJ IDEA.
 * User: Vivien
 * Date: 09/02/13
 * Time: 23:26
 * To change this template use File | Settings | File Templates.
 */

function restaurantsCtrl($scope) {

    $scope.nextId = 3;

    $scope.restaurants = [
        {id:1, name:'Subway', address:'1 place des Palmiers 92200 Neuilly-sur-Seine', description:'Sandwicherie rapide. Sandwichs de taille et composition personnalisables.'},
        {id:2, name:'Quick', address:'Centre Commercial les 4 Temps 92300 Courbevoie', description:'Fast-food, burgers, frites'}];

    $scope.addRestaurant = function() {
        $scope.restaurants.push({id:$scope.nextId, name:$scope.newName, address:$scope.newAddress, description:$scope.newDescription});
        $scope.nextId ++;
    };
}
