/**
 * Created by Administrator on 2017/8/11 0011.
 */
angular.module("myApp")
.factory("httpServer",["$http",function($http){
    return {
        useHttp:function(url,method,options,fn){
            if(method=="get"){
                $http({
                    method:method,
                    url:url,
                    params:options
                }).then(function success(res){
                    fn(res);
                })
            }else if(method=="post"){
                $http({
                    method:method,
                    url:url,
                    data:options
                }).then(function success(res){
                    fn(res)
                })
            }else{
                console.log("error")
            }
        }
    }
}]);