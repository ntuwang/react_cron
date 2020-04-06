import { Base64 } from "js-base64";

const storage = process.env.NODE_ENV === "development" ? localStorage : sessionStorage;

let tools = {};
tools.title = function(title) {
	title = title || "zadmin";
	window.document.title = title;
};

//保存数据
tools.setItem = (k, v) => {
	storage.setItem(k, v);
};
tools.getItem = k => {
	return storage.getItem(k);
};
tools.clearItem = k => {
	storage.removeItem(k);
};
tools.clearData = () => {
	storage.clear();
};
tools.setToken = token => {
	tools.setItem("token", token);
};
tools.getToken = () => {
	return tools.getItem("token");
};
// 获取保存的用户信息
tools.getAuth = () => {
	try {
		let token = Base64.decode(tools.getItem("bearer").split(".")[1]);
		let auth = JSON.parse(token);
		if (!auth.hasOwnProperty("id")) {
			tools.removeItem("token");
			window.location.href = "/login";
		}
		return auth;
	} catch (e) {
		tools.removeItem("token");
		window.location.href = "/login";
	}
};
// 不需要也可登录页面集合
tools.noAuth = r => {
	return ["login", "errjwt", "err401", "err50x", "err404"].indexOf(r) > -1;
};
tools.Role = {
	RSup: 30, //超级管理员
	RAtv: 20, //启用/禁用
	RBas: 10, //基本权限
	//判断指定位置权限
	getRole: (rl, r) => {
		if ((rl & (1 << r)) >> r == 1) {
			return true;
		}
		return false;
	}
};
tools.Role.isSup = rl => {
	return tools.Role.getRole(rl, tools.Role.RSup);
};
tools.Role.isAtv = rl => {
	return tools.Role.getRole(rl, tools.Role.RAtv);
};
// 权限路由相关
tools.Role.allow = (role, arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (tools.Role.getRole(role, arr[i])) {
			return true;
		}
	}
	return false;
};
export default tools;
