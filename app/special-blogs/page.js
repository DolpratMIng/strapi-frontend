import axios from "axios";

import { cookies, headers } from "next/headers";

const fetchSpecialBlogs = async () => {
  try {
    const token = (await cookies()).get("token");
    console.log("token", token); // maybe need to delete
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/special-blogs`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page() {
  const blogs = await fetchSpecialBlogs();
  const headerList = headers();
  const user = JSON.parse(headerList.get("users"));

  return (
    <div className="ml-20">
      Hello {user.email}
      <div className="grid grid-cols-4 gap-2">
        {blogs.map((blog, index) => (
          <div className="flex flex-col" key={index}>
            <div className="text-3xl">{blog.title}</div>
            <div>{blog.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
