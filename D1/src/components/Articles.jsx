
import articles from "./authorArticles";

function Articles() {
  return (
    <>
    <br />
    <hr className="w-[50vw] border-0 border-t-[3px] border-[#019bce] my-[20px] mx-auto" />
    <section className="w-[92%] max-w-[1200px] mx-auto my-[30px]">
      <h2 className="text-[#019bce] text-3xl text-center mb-6">
        Featured Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <article
            key={article.title}
            className="rounded-md overflow-hidden border border-gray-200"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[120px] object-cover"
            />

            <div className="p-3">
              <h3 className="text-[#019bce] font-bold">
                {article.title}
              </h3>

              <p className="mt-2 text-sm">
                {article.description}
              </p>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span>
                  <span className="text-yellow-500">★</span>{" "}
                  {article.rating}
                </span>

                <span>{article.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-gray-300 px-4 py-2 rounded-sm text-black hover:bg-gray-400 transition">
          See all articles
        </button>
      </div>
    </section>
    </>
  );
}

export default Articles;
