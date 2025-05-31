import axios from "axios";

const fetchBlog = async (documentId) => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/blogs/${documentId}/?populate[0]=thumbnail&populate[1]=author`
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page({ params }) {
  const blogdocumentId = params.documentId;
  const blog = await fetchBlog(blogdocumentId);

  return (
    <div>
      Blog ID: {blog.id}
      <img
        width="100px"
        src={`${process.env.STRAPI_BASE_URL}${blog.thumbnail.url}`}
      />
      <div>{blog.title}</div>
      <div>author by: {blog.author.name}</div>
    </div>
  );
}
