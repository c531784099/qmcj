/**
 * Created by Administrator on 2017/8/8 0008.
 */
angular.module("myApp")
.controller("infoController",["httpServer","$scope","$rootScope",'urls',function(httpServer,$scope,$rootScope,urls){
    $scope.safeLv=["低","中","高"];
    $scope.userInfo={};
    $scope.infoCur=0;
    $scope.infoTrans=function(x){
        $scope.infoCur=x
    };
    httpServer.useHttp(urls.userInfoUrl,"post",{
        phone:$rootScope.userMsg.userphone
    },function(res){
        $scope.userInfo=res.data.result;
    });
}]);