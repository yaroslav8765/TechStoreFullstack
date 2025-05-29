import React from "react";

function ProfileMenu({
  onBasketClick,
  onEditProfileClick,
  onChangePasswordClick,
  onMyOrdersClick,
  logoutHandler,
}) {
  const baseButton =
    "text-left text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200";
  const logoutButton =
    "text-left text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 hover:text-red-700 transition duration-200 font-semibold";

  return (
    <div className="flex flex-col gap-1  bg-white rounded-lg w-64">
      <button className={baseButton} onClick={onBasketClick}>
         Cart
      </button>
      <button className={baseButton} onClick={onEditProfileClick}>
         Edit Profile
      </button>
      <button className={baseButton} onClick={onChangePasswordClick}>
         Change Password
      </button>
      <button className={baseButton} onClick={onMyOrdersClick}>
         My Orders
      </button>
      <div className="border-t border-gray-200 my-2" />
      <button className={logoutButton} onClick={logoutHandler}>
         Logout
      </button>
    </div>
  );
}

export default ProfileMenu;
