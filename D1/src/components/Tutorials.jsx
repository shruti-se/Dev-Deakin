import tutorials from './authorTutorials'

function Tutorials() {
  return (
    <section className="w-[92%] max-w-[1200px] mx-auto my-[30px]">

      <h2 className="text-[#019bce] text-[32px] text-center mb-[25px]">
        Featured Tutorials
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">

        {tutorials.map((tutorial) => (
          <div
            key={tutorial.title}
            className="border border-gray-200 rounded-[8px] overflow-hidden"
          >
            <img
              src={tutorial.image}
              alt={tutorial.title}
              className="w-full h-[120px] object-cover"
            />

            <div className="p-[15px]">

              <h3 className="text-[#019bce] text-base font-bold">
                {tutorial.title}
              </h3>

              <p className="mt-[6px] text-sm leading-5">
                {tutorial.description}
              </p>

              {tutorial.rating != null && (
                <div className="mt-[10px] flex items-center gap-2 text-sm">
                  <span className="text-yellow-500">
                    ★
                  </span>
                  <span>{tutorial.rating}</span>

                  {tutorial.username && (
                    <span className="ml-auto text-gray-600">
                      {tutorial.username}
                    </span>
                  )}
                </div>
              )}

            </div>
          </div>
        ))}

      </div>

      <div className="flex justify-center mt-[20px]">
        <button className="bg-gray-300 px-[18px] py-[8px] rounded text-black hover:bg-gray-400 transition">
          See all tutorials
        </button>
      </div>

    </section>
  )
}

export default Tutorials
