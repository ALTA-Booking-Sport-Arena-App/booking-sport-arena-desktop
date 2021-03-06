import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import user from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import { statusLogin } from "../services/Users";
import swal from "sweetalert";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function UserDropdown() {
	const navigate = useNavigate();
	const getToken = localStorage.getItem("user-info");
	const isLogin = getToken ? statusLogin() : getToken;
	return (
		<>
			<Menu as="div" className="relative inline-block text-left">
				<div className="">
					<Menu.Button className="inline-flex justify-center w-full rounded-md border-teal-500 text-teal-500 border shadow-sm px-4 py-2 bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 my-3">
						<img src={user} alt="" height={20} width={20} />
						<i className="fa-solid fa-angle-down my-auto pl-2"></i>
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95">
					<Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
						{isLogin ? (
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										// eslint-disable-next-line
										<a
											href="#"
											className={classNames(
												active
													? "bg-gray-100 text-gray-900"
													: "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
											onClick={() => {
												navigate("/user");
											}}>
											Profile
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										// eslint-disable-next-line
										<a
											href="#"
											className={classNames(
												active
													? "bg-gray-100 text-gray-900"
													: "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
											onClick={() => {
												navigate("/user/history");
											}}>
											History
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											type="submit"
											className={classNames(
												active
													? "bg-gray-100 text-gray-900"
													: "text-gray-700",
												"block w-full text-left px-4 py-2 text-sm"
											)}
											onClick={() => {
												localStorage.removeItem(
													"user-info"
												);
												navigate("/");
												swal(
													"Logout",
													"Success",
													"success"
												);
											}}>
											Sign out
										</button>
									)}
								</Menu.Item>
							</div>
						) : (
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											href="#"
											className={classNames(
												active
													? "bg-gray-100 text-gray-900"
													: "text-gray-700",
												"block w-full text-left px-4 py-2 text-sm"
											)}
											onClick={() => navigate("/login")}>
											Sign in
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											href="#"
											className={classNames(
												active
													? "bg-gray-100 text-gray-900"
													: "text-gray-700",
												"block w-full text-left px-4 py-2 text-sm"
											)}
											onClick={() =>
												navigate("/register")
											}>
											Register
										</button>
									)}
								</Menu.Item>
							</div>
						)}
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	);
}
