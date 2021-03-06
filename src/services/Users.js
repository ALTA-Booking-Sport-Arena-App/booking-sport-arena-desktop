import axios from 'axios';
import { MuiError } from "../functions/Alert";

export const API = `https://haudhi.site`;
export function statusLogin() {
	const getToken = localStorage.getItem("user-info");
	const parsedToken = getToken ? JSON.parse(getToken) : "";
	const token = parsedToken.token;
	return token;
}

export const fetchUser = async (props) => {
	const token = statusLogin();
	await axios
		.get(`${API}/users/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			const profile = res.data.data;
			props.setFullName(profile.fullname);
			props.setUsername(profile.username);
			props.setEmail(profile.email);
			props.setPhoneNumber(profile.phone_number);
			props.setBusinessName(profile.business_name);
			props.setImage(profile.image);
			props.setUserId(profile.id);
			props.setRole(profile.role);
		})
		.catch((err) => {
			MuiError(err);
		});
};

export function statusRole() {
	const getRole = localStorage.getItem("user-info");
	const parsedRole = getRole ? JSON.parse(getRole) : "";
	const role = parsedRole ? parsedRole.role : "";
	return role;
}