<template>
	<view>
		<map id="test_map" ref="map1" style="width: 100%; height: 600px" :show-location="true"
			:longitude="map.longitude" :latitude="map.latitude" :markers="markers" show-compass="true"
			:controls="controls">

		</map>
		<button @click="startChangeLocation">开始监听位置变化</button>
		<button @click="stopChangeLocation">停止监听位置变化</button>
	</view>
</template>
<script>
	import permission from '@/utils/permission.js';
	export default {
		data() {
			return {
				mapContext: {},
				map: {
					longitude: "", //经度
					latitude: "", //纬度
				},
				//线数据
				polyline: [],
				controls: [],
				//撒点list
				markers: [],
				lastLocation: [], // 最后一次定位点
				locationWatcherId: null
			};
		},
		mounted() {
			this.mapContext = uni.createMapContext("test_map", this);

			// 初始化权限
			this.initPositionPermission();
		},
		onShow() {
			this.stopChangeLocation();
			setTimeout(() => {
				uni.showToast({
					title: '当前数组长度' + this.lastLocation.length,
					icon: 'none'
				})
			}, 2000)
		},
		methods: {
			/**
			 * @Description: 初始化定位
			 * @author: 李建鹏
			 */
			initData() {
				// 进来直接定位
				setTimeout(() => {
					this.position();
				}, 1000)
			},
			/**
			 * @Description: 初始化权限及获取定位
			 * @author: 李建鹏
			 */
			async initPositionPermission() {
				let status = await permission.requestAndroid('android.permission.ACCESS_FINE_LOCATION');

				if (status === null || status === 1) {
					status = 1;
					this.initData();
				} else if (status === 2) {
					uni.showModal({
						content: "为了您更好的体验App功能，需要获取位置信息，请点击设置开启定位权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permission.gotoAppSetting();
							}
						}
					})
				} else if (status.code) {
					uni.showModal({
						content: status.message
					})
				} else {
					uni.showModal({
						content: "为了您更好的体验App功能，需要获取位置信息，请点击设置开启定位权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permission.gotoAppSetting();
							}
						}
					})
				}
			},
			/**
			 * @Description: 定位
			 * @author: 李建鹏
			 */
			position() {
				const that = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						const latitude = res.latitude; // 纬度
						const longitude = res.longitude; // 经度

						that.mapContext.moveToLocation({
							latitude: latitude,
							longitude: longitude,
							success: (res) => {
								that.map.latitude = latitude;
								that.map.longitude = longitude;
							},
						});

						uni.onLocationChange(function(res) {
							console.log('纬度：' + res.latitude);
							console.log('经度：' + res.longitude);
							uni.showToast({
								title: '纬度：' + res.latitude,
								icon: 'none'
							})
							const currentLocation = res.latitude + ',' + res.longitude;
							that.lastLocation.push(currentLocation);
							// if (that.lastLocation) {
							// 	that.distance += that.calculateDistance(that.lastLocation,
							// 		currentLocation);
							// 	that.lastLocation = currentLocation;
							// }
						});

						that.startChangeLocation();
					},
					fail: function(res) {
						console.log('获取位置失败：', res);
					}
				});
			},
			/**
			 * @Description: 开始监听位置变化
			 * @author: 李建鹏
			 */
			startChangeLocation() {
				uni.startLocationUpdate({
					success: res => console.log('开启应用接收位置消息成功'),
					fail: err => console.error('开启应用接收位置消息失败：', err),
					complete: msg => console.log('调用开启应用接收位置消息 API 完成')
				});
			},
			/**
			 * @Description: 停止监听位置变化
			 * @author: 李建鹏
			 */
			stopChangeLocation() {
				uni.stopLocationUpdate({
					success() {
						console.log('停止成功');
					},
					fail() {
						console.log('停止失败');
					}
				})
			},
			/**
			 * @Description: 获取权限 返回状态
			 * @author: 李建鹏
			 */
			requestAndroid(permissionID) {
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
		},
	};
</script>
<style>

</style>