var usermodel = angular.module('userApp', [])

usermodel.controller('userCtrl', ($scope, $http) => {
    $scope.userData = []
    $scope.newuserData = {}

    $scope.getUserData = () => {
        $http.get('/api/getUserData').then((response) => {
            $scope.userData = response.data
        })
    }

    $scope.addUser = () => {
        $http.post('/api/addUser', $scope.newuserData).then((response) => {
            $scope.userData.push(response.data)
            $scope.newuserData = {}
        })
    }
    $scope.deleteItem = function (item) {
        $http.delete(`/api/delete/${item}`).then((response) => {
            $scope.items = response.data
            $scope.getUserData()
        })
    }
    $scope.updateItem = (item) => {
        $scope.edit = true
        $scope.updatedItem = item
    }
    $scope.editItem = function (up) {
        $http.put(`/api/update/${up.bookID}`, up).then((response) => {
            $scope.items = response.data
        })
        $scope.getUserData()
    }

    $scope.displayData = (item)=>{
        
        $scope.desc = true;
        $scope.bookName = item.bookName;
        $scope.authorName = item.authorName;
        $scope.description = item.description;
        $scope.bookPrice = item.bookPrice;
        $scope.noofpages = item.noofpages;
        $scope.image = item.image;

        
    }

    //----------------

    $scope.Myfunc = (search) => {
        $http.get('/api/getUserData').then((response) => {
            $scope.userData = response.data
        })
    }


    $scope.getUserData()

})

