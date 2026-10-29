import projects from './authorProjects'

function Projects() {
  return (
    <section className="w-[92%] max-w-[1200px] mx-auto">

      <div className="flex flex-row justify-center gap-[20px]">

        {projects.map((project) => (
          <div
            key={project.title}
            className="w-[30%] text-center"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[180px] object-contain rounded-[10px] transition-transform duration-200 hover:scale-[1.2]"
            />

            <h3 className="text-[#019bce] text-xl font-bold mt-[10px]">
              {project.title}
            </h3>

            <p className="mt-[5px] text-sm">
              {project.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  )
}

export default Projects