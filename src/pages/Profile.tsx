const Profile = () => {
	const userData = JSON.parse(localStorage.getItem("loggedInUser"));

	return (
		<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
			<h1 className="text-2xl font-bold mb-4">Profile</h1>
			<div className="mb-4">
				<label className="block font-medium">Username:</label>
				<p>{userData.user.username}</p>
			</div>
			<div className="mb-4">
				<label className="block font-medium">Email:</label>
				<p>{userData.user.email}</p>
			</div>
			<div className="mb-4">
				<label className="block font-medium">Provider:</label>
				<p>{userData.user.provider}</p>
			</div>
			<div className="mb-4">
				<label className="block font-medium">Account Status:</label>
				<p>{userData.user.confirmed ? "Confirmed" : "Not Confirmed"}</p>
				<p>{userData.blocked ? "Blocked" : "Active"}</p>
			</div>
		</div>
	);
};

export default Profile;
