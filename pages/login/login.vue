<template>
	<view class="login">
		<view class="login-box">
			<view class="login-box-title">登录</view>
			<view class="login-box-form">
				<view class="login-box-form-line">
					<uni-icons type="contact" size="24" color="rgb(247,120,172)"></uni-icons>
					<input type="text" value="" placeholder="请输入账号" />
				</view>
				<view class="login-box-form-line">
					<uni-icons type="eye" size="24" color="rgb(247,120,172)"></uni-icons>
					<input type="passsword" value="" placeholder="请输入密码" />
				</view>
				<view class="login-box-form-btn" @click="login">登录</view>
			</view>
		</view>

		<view class="login-tips">
			二次元自律记@2024
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			/**
			 * @description 登录
			 */
			login() {
				uni.switchTab({
					url: '/pages/map/map'
				})
			}
		}
	}
</script>

<style scoped>
	.login {
		height: 100vh;
		background: url("@/static/bg.png") no-repeat;
		background-size: 100% 100%;
	}

	.login-box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
		width: 90%;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 22rpx;
		padding: 60rpx;
		box-sizing: border-box;
	}

	.login-box-title {
		color: #fff;
		font-size: 40rpx;
		letter-spacing: 10rpx;
		margin-bottom: 40rpx;
	}

	.login-box-form-line {
		height: 86rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20rpx;
		background-color: #f5f5f5;
		border-radius: 10rpx;
		padding-left: 10rpx;
	}

	.login-box-form-line input {
		margin-left: 20rpx;
		font-size: 28rpx;
	}

	.login-box-form-line input {
		margin-left: 20rpx;
	}

	.login-box-form-forget {
		font-size: 26rpx;
		color: #b5b5b5;
		text-align: end;
		padding: 0 10rpx;
		display: flex;
		justify-content: space-between;
	}

	.login-box-form-btn {
		margin-top: 20rpx;
		line-height: 85rpx;
		text-align: center;
		background-image: linear-gradient(to right, #2AFADF 10%, #4C83FF 100%);
		border-radius: 227rpx;
		color: #fff;
		margin-top: 40rpx;
	}

	.login-tips {
		text-align: center;
		font-size: 28rpx;
		position: fixed;
		bottom: 50rpx;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #f5f6f7;
		font-weight: 600;
	}
</style>