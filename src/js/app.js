/**
 * Created by Administrator on 2017/8/5 0005.
 */
angular.module("myApp",['ui.router',"ngAnimate"])
    .config(["$httpProvider", function($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        $httpProvider.defaults.transformRequest = [
            function(data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }
        ];
    }])
.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.state("/",{
        url:"/",
        templateUrl:"views/index.html"
    })
        .state("register",{
            url:"/register",
            templateUrl:"views/register.html"
        })
        .state("login",{
            url:"/login",
            templateUrl:"views/login.html"
        })
        .state("list",{
            url:"/list",
            templateUrl:"views/list.html"
        })
        .state("information",{
            url:"/information",
            templateUrl:"views/information.html"
        })
        .state("information.psMsg",{
            views:{
                "userInfo":{
                    templateUrl:"views/user-info/psMsg.html"
                }
            },
            url:"/psMsg"
        })
        .state("information.safeSetting",{
            views:{
                "userInfo":{
                    templateUrl:"views/user-info/safeSetting.html"
                }
            },
            url:"/safeSetting"
        })
        .state("information.purchaseRecord",{
            views:{
                "userInfo":{
                    templateUrl:"views/user-info/purchaseRecord.html"
                }
            },
            url:"/purchaseRecord"
        })
        .state("information.mainPage",{
            views:{
                "userInfo":{
                    templateUrl:"views/user-info/mainPage.html"
                }
            },
            url:"/mainPage"
        })
}])