import { useState } from "react";

function Post() {
    const [postType, setPostType] = useState("Question");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    function handlePost() {
        if (
            title.trim() === "" ||
            description.trim() === "" ||
            tags.trim() === ""
        ) {
            alert("Please fill in all the fields before posting.");
            return;
        }

        alert(`${postType} posted successfully!`);

        setTitle("");
        setDescription("");
        setTags("");
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-[black]">
                Create a Post
            </h1>

            <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="postType"
                        value="Question"
                        checked={postType === "Question"}
                        onChange={(e) => setPostType(e.target.value)}
                        className="accent-[#019bce]"
                    />
                    <span className="text-black">Question</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="postType"
                        value="Article"
                        checked={postType === "Article"}
                        onChange={(e) => setPostType(e.target.value)}
                        className="accent-[#019bce]"
                    />
                    <span className="text-black">Article</span>
                </label>
            </div>


            {postType === "Question" ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-[black]">
                        Ask a Question
                    </h2>

                    <label htmlFor="questionTitle">
                        Question Title
                    </label>
                    <input
                        id="questionTitle"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your question title"
                        className="border p-2 w-full mb-4 rounded-md"
                    />

                    <label htmlFor="questionDescription">
                        Question Description
                    </label>
                    <textarea
                        id="questionDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your question..."
                        className="border p-2 w-full mb-4 rounded-md"
                        rows={5}
                    />

                    <label htmlFor="questionTags">
                        Tags
                    </label>
                    <input
                        id="questionTags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags separated by commas"
                        className="border p-2 w-full mb-4 rounded-md"
                    />
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-[#019bce]">
                        Write an Article
                    </h2>

                    <label htmlFor="articleTitle">
                        Article Title
                    </label>
                    <input
                        id="articleTitle"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your article title"
                        className="border p-2 w-full mb-4 rounded-md"
                    />

                    <label htmlFor="articleContent">
                        Article Content
                    </label>
                    <textarea
                        id="articleContent"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write your article content..."
                        className="border p-2 w-full mb-4 rounded-md"
                        rows={8}
                    />

                    <label htmlFor="articleTags">
                        Tags
                    </label>
                    <input
                        id="articleTags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags separated by commas"
                        className="border p-2 w-full mb-4 rounded-md"
                    />
                </div>
            )}

            <button
                type="button"
                onClick={handlePost}
                className="bg-[#019bce] rounded-md text-white px-6 py-2 hover:bg-[#017da8]"
            >
                Post
            </button>
        </div>
    );
}

export default Post;

