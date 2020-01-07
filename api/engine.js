let debug = true;
var app = getApp();
var HOST = debug ? 'http://ti.prguanjia.com/' : 'https://api.prguanjia.com/';
var requestHandler = {
  params: {},
  path: "",
  onSuccess: function (res) { },
  onFail: function (err) { }
}

function GET(requestHandler) {
  request("GET", requestHandler);
}
function POST(requestHandler) {
  request("POST", requestHandler);
}

function request(method, requestHandler) {
  wx.showLoading({
    title: '加载中...',
  });
  var app = getApp();
  var uuid = app && app.globalData && app.globalData.data && app.globalData.data.uuid ? app.globalData.data.uuid : '';
  wx.request({
    url: requestHandler.path.indexOf('http') !=-1 ? requestHandler.path: HOST + requestHandler.path,
    header: {
      'content-type': method == 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
      uuid: uuid
      //   'platform':app.data.platform,
    },
    method: method,
    data: requestHandler.params,
    success: function (res) {
      requestHandler.onSuccess(res);
      wx.hideLoading();
    },
    fail: function (err) {
      wx.hideLoading();
      if (requestHandler.onFail) {
        requestHandler.onFail(err);
      }
    },
  });

}

module.exports = {
  GET: GET,
  POST: POST
}