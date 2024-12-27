import { UserCircle, Mail, Shield, CheckCircle, XCircle } from "lucide-react";

const Profile = () => {
	const userData = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

	const profileItems = [
		{ label: "Username", value: userData.user?.username, icon: UserCircle },
		{ label: "Email", value: userData.user?.email, icon: Mail },
		{ label: "Provider", value: userData.user?.provider, icon: Shield },
	];

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="bg-blue-600 px-4 py-5 sm:px-6">
					<h1 className="text-2xl font-bold text-white">Profile</h1>
				</div>
				<div className="px-4 py-5 sm:p-6">
					{profileItems.map((item, index) => (
						<div key={index} className="flex items-center mb-4 last:mb-0">
							<item.icon className="h-5 w-5 text-gray-500 mr-3" />
							<div>
								<label className="block text-sm font-medium text-gray-700">
									{item.label}:
								</label>
								<p className="mt-1 text-sm text-gray-900">{item.value}</p>
							</div>
						</div>
					))}
					<div className="mt-6 border-t border-gray-200 pt-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-700">
								Account Status:
							</span>
							<div className="flex items-center">
								{userData.user?.confirmed ? (
									<CheckCircle className="h-5 w-5 text-green-500 mr-1" />
								) : (
									<XCircle className="h-5 w-5 text-red-500 mr-1" />
								)}
								<span
									className={`text-sm ${
										userData.user?.confirmed ? "text-green-500" : "text-red-500"
									}`}>
									{userData.user?.confirmed ? "Confirmed" : "Not Confirmed"}
								</span>
							</div>
						</div>
						<div className="flex items-center justify-between mt-2">
							<span className="text-sm font-medium text-gray-700">
								Account:
							</span>
							<div className="flex items-center">
								{!userData.user?.blocked ? (
									<CheckCircle className="h-5 w-5 text-green-500 mr-1" />
								) : (
									<XCircle className="h-5 w-5 text-red-500 mr-1" />
								)}
								<span
									className={`text-sm ${
										!userData.user?.blocked ? "text-green-500" : "text-red-500"
									}`}>
									{!userData.user?.blocked ? "Active" : "Blocked"}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
