/// null = 未请求，1 = 已允许，0 = 拒绝|受限, 2 = 系统未开启

var isIOS

function location() {
	var result = 0;
	var cllocationManger = plus.ios.import("CLLocationManager");
	var enable = cllocationManger.locationServicesEnabled();
	var status = cllocationManger.authorizationStatus();
	if (!enable) {
		result = 2;
	} else if (status === 0) {
		result = null;
	} else if (status === 3 || status === 4) {
		result = 1;
	} else {
		result = 0;
	}
	plus.ios.deleteObject(cllocationManger);
	return result;
}

function requestIOS(permissionID) {
	return new Promise((resolve, reject) => {
		switch (permissionID) {
			case "location":
				resolve(location());
				break;
			default:
				resolve(0);
				break;
		}
	});
}

function requestAndroid(permissionID) {
	return new Promise((resolve, reject) => {
		plus.android.requestPermissions(
			[permissionID],
			function(resultObj) {
				var result = 0;
				for (var i = 0; i < resultObj.granted.length; i++) {
					var grantedPermission = resultObj.granted[i];
					console.log('已获取的权限：');
					result = 1
				}
				for (var i = 0; i < resultObj.deniedPresent.length; i++) {
					var deniedPresentPermission = resultObj.deniedPresent[i];
					console.log('拒绝本次申请的权限：');
					result = 0
				}
				for (var i = 0; i < resultObj.deniedAlways.length; i++) {
					var deniedAlwaysPermission = resultObj.deniedAlways[i];
					console.log('永久拒绝申请的权限：');
					result = -1
				}
				resolve(result);
			},
			function(error) {
				resolve({
					code: error.code,
					message: error.message
				});
			}
		);
	});
}

function gotoAppPermissionSetting() {
	if (permission.isIOS) {
		var UIApplication = plus.ios.import("UIApplication");
		var application2 = UIApplication.sharedApplication();
		var NSURL2 = plus.ios.import("NSURL");
		var setting2 = NSURL2.URLWithString("app-settings:");
		application2.openURL(setting2);
		plus.ios.deleteObject(setting2);
		plus.ios.deleteObject(NSURL2);
		plus.ios.deleteObject(application2);
	} else {
		var Intent = plus.android.importClass("android.content.Intent");
		var Settings = plus.android.importClass("android.provider.Settings");
		var Uri = plus.android.importClass("android.net.Uri");
		var mainActivity = plus.android.runtimeMainActivity();
		var intent = new Intent();
		intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
		var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
		intent.setData(uri);
		mainActivity.startActivity(intent);
	}
}

const permission = {
	get isIOS() {
		return typeof isIOS === 'boolean' ? isIOS : (isIOS = uni.getSystemInfoSync().platform === 'ios')
	},
	requestIOS: requestIOS,
	requestAndroid: requestAndroid,
	gotoAppSetting: gotoAppPermissionSetting
}

export default permission