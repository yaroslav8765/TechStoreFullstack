function SmallImage({ url, clickAction }) {
  return (
    <div className="w-[100px] h-[100px] min-w-[100px] min-h-[100px] m-2 border-2 border-gray-300 rounded-xl overflow-hidden">
      <img
        src={url}
        alt=""
        className="w-full h-full object-cover p-2"
      />
    </div>
  );
}

export default SmallImage;
