import React from "react";

function ProfileMenu({
  onBasketClick,
  onEditProfileClick,
  onChangePasswordClick,
  onMyOrdersClick,
  logoutHandler
}) {
  const buttonClass = "text-gray-700 text-start ml-4 hover:text-blue-700 ";

  return (
    <div className="flex flex-col gap-2 py-4">
      <button className={buttonClass} onClick={onBasketClick}>Basket</button>
      <button className={buttonClass} onClick={onEditProfileClick}>Edit profile</button>
      <button className={buttonClass} onClick={onChangePasswordClick}>Change password</button>
      <button className={buttonClass} onClick={onMyOrdersClick}>My orders</button>
      <button className="text-red-700 text-start ml-4 hover:text-red-500"  onClick={logoutHandler}> Logout </button>

    </div>
  );
}

export default ProfileMenu;
