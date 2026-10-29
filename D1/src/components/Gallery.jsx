import images from './images'

function Gallery() {
  return (
    <section className="w-[92%] max-w-[1200px] mx-auto my-[30px]">
      <br />
      <hr className="w-[50vw] border-0 border-t-[3px] border-[#019bce] my-[20px] mx-auto" />
      <br />
      <p className="text-[#019bce] text-[5vh] text-center">
        My Gallery
      </p>
      <br />
      <div className="columns-[200px] gap-[10px]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-auto block mb-[10px] rounded-[8px] break-inside-avoid transition-transform duration-300 hover:scale-[1.06]"
          />
        ))}
      </div>

    </section>
  )
}

export default Gallery