function Banner() {
  return (
    <div
      className="flex items-end h-[20vh] md:h-[60vh] bg-center bg-no-repeat "
      style={{
        backgroundImage:
          "url(https://assets-in.bmscdn.com/discovery-catalog/events/et00311714-ewdhvajezf-landscape.jpg)",
      }}
    >
      {/* //Overlay text */}
      <div className="w-full text-xl md:text-3xl bg-gray-900 text-white text-center bg-opacity-60">
        John Wick
      </div>
    </div>
  );
}

export default Banner;
