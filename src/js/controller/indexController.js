/**
 * Created by Administrator on 2017/8/6 0006.
 */
angular.module("myApp")
    .controller("indexController",["$scope","$rootScope","httpServer","urls",function ($scope,$rootScope,httpServer,urls) {
        //banner部分
        $scope.banner = {};
        //热门项目部分
        $scope.typeCur=0;
        $scope.bannerCur=0;
        $scope.type = ['微电影', '电视剧', '话剧', '电影', '戏曲', '书画', '相声', '戏剧', '音乐剧'];
        $scope.hotProject = null;
        $scope.change = function (x) {
            $scope.typeCur=x;
        };
        //卫视主推部分
        $scope.new=null;
        //合作商家
        $scope.unit=null;
        //获取数据部分
        httpServer.useHttp(urls.homeUrl,"get",{},function(res){
            $scope.banner = res.data.result.slides;
            $scope.hotProject = res.data.result.hot;
            $scope.new=res.data.result.new;
            $scope.unit=res.data.result.unit;
        });
    }]);