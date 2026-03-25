function Video() {
  return (
    <div className="h-full w-full">
      <video autoPlay loop muted src="/video.mp4"
       className="h-full w-full object-cover " >
      </video>
    </div>
  );
}

export default Video;
