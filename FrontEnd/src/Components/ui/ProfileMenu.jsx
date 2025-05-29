import React from "react";

function ProfileMenu({
  onBasketClick,
  onEditProfileClick,
  onChangePasswordClick,
  onMyOrdersClick,
  logoutHandler
}) {
  const buttonClass = "text-gray-700  rounded-sm pl-2 text-start mx-2 py-1 hover:bg-gray-300 transition-bg duration-200";

  return (
    <div className="flex flex-col gap-2 py-4">
      <button className={buttonClass} onClick={onBasketClick}>Basket</button>
      <button className={buttonClass} onClick={onEditProfileClick}>Edit profile</button>
      <button className={buttonClass} onClick={onChangePasswordClick}>Change password</button>
      <button className={buttonClass} onClick={onMyOrdersClick}>My orders</button>
      <button className="text-red-700 rounded-sm pl-2 text-start mx-2 py-1 hover:text-red-500 hover:bg-red-100 transition-bg duration-200"  onClick={logoutHandler}> Logout </button>

    </div>
  );
}

export default ProfileMenu;
