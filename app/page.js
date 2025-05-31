import axios from "axios";
import Link from "next/link";

const fetchBlogs = async () => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/blogs`
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page() {
  const blogs = await fetchBlogs();
  return (
    <div className="ml-20">
      Hello Page
      <div className="grid grid-cols-4 gap-2">
        {blogs.map((blog, index) => (
          <div className="flex flex-col" key={index}>
            <div className="text-3xl">{blog.title}</div>
            <div>{blog.description}</div>
            <Link href={`blog/${blog.documentId}`} className="bg-blue-300 p-4">
              See more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
