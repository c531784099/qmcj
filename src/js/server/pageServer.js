/**
 * Created by Administrator on 2017/8/12 0012.
 */
angular.module("myApp")
    .factory("pageServer", function () {
        return {
            pageComponent: function (pageArr, pageCur, pageCount, showPageBetween) {
                pageArr = [];
                var arrInit = Math.min(pageCount - 1, pageCur + showPageBetween);
                for (var i = 0; i < arrInit + 1; i++) {
                    if (arrInit == (pageCount - 1)) {
                        pageArr[i] = i + 1;
                    } else if (i == arrInit) {
                        pageArr[i] = '...';
                        //此处必须为4个点
                    } else {
                        pageArr[i] = i + 1
                    }
                }
                if (pageCur > showPageBetween * 2 + 1) {
                    pageArr.splice(2, pageCur - showPageBetween * 2 - 1, '....');
                    //此处必须不能为三个点
                }
                return pageArr

            }
        }
    });