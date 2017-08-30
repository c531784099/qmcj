/**
 * Created by Administrator on 2017/8/9 0009.
 */
angular.module("myApp")
    .controller("userController", ["$scope", "$rootScope", "httpServer", 'urls', 'pageServer', function ($scope, $rootScope, httpServer, urls, pageServer) {
        $scope.type = ['微电影', '电视剧', '话剧', '电影', '戏曲', '书画', '相声', '戏剧', '音乐剧'];
        $scope.sex = "1";
        $scope.interest = [];
        //安全设置部分
        $scope.settingCur = 1;
        $scope.bindPhone = $rootScope.userMsg.userphone.substring(0, 3) + "****" + $rootScope.userMsg.userphone.substring(7);
        $scope.settingTransform = function (x) {
            $scope.settingCur = x;
        };
        //个人主页
        $scope.procare = [];
        $scope.prohot = [];
        //购买记录部分
        $scope.recordList = [];
        $scope.payStatus = ["未支付", "已支付"];
        $scope.allPayStatus = ['全部', "未支付", "已支付"];
        $scope.deletePro = true;
        for (var i = 0; i < $scope.type.length; i++) {
            $scope.interest[i] = 1;
        }
        $scope.changePayStatus = function (index) {
            $scope.payStatusType = index;
            recordInfo.getData();
        };
        $scope.changePage = function (index) {
            if (index == "..." || index == "....") {
                return
            }
            if ($scope.recordPage != index) {
                $scope.recordPage = index;
                recordInfo.getData();
            }
        };
        $scope.prev = function () {
            if ($scope.recordPage > 1) {
                $scope.recordPage--;
                recordInfo.getData()
            }
        };
        $scope.next = function () {
            if ($scope.recordPage < $scope.pageCount) {
                $scope.recordPage++;
                recordInfo.getData()
            }
        };
        $scope.checkDelete = function (index) {
            var confirmDel = confirm("您确定要删除购买记录吗");
            if (confirmDel) {
                $scope.recordList.splice(index, 1);
            }
        }
        //个人主页的获取
        httpServer.useHttp(urls.userProsUrl, "get", {}, function (res) {
            $scope.procare = res.data.result.procare;
            $scope.prohot = res.data.result.prohot;
        });
        //支付状态的获取
        $scope.pageArr = [];
        var showPageBetween = 2;
        var recordInfo = {
            init: function () {
                $scope.payStatusType = 0;
                $scope.recordPage = 1;
                $scope.count = 6;
                this.getData();
            },
            getData: function () {
                httpServer.useHttp(urls.recordUrl, "post", {
                    type: $scope.payStatusType,
                    page: $scope.recordPage,
                    count: $scope.count
                }, function (res) {
                    $scope.recordList = res.data.result.list;
                    $scope.pageCount = Math.ceil(res.data.result.count / $scope.count);
                    $scope.pageArr = pageServer.pageComponent($scope.pageArr, $scope.recordPage, $scope.pageCount, showPageBetween);
                    console.log($scope.pageArr);
                    $(window).scrollTop(0);
                })
            }
        };
        recordInfo.init();
    }]);