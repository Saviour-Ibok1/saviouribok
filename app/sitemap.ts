import { MetadataRoute } from "next";
import { getPosts } from "@/lib/queries/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url:          `https://saviouribok.com/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url:             "https://saviouribok.com",
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1,
    },
    {
      url:             "https://saviouribok.com/blog",
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             "https://saviouribok.com/about",
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             "https://saviouribok.com/projects",
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             "https://saviouribok.com/contact",
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.6,
    },
    ...postEntries,
  ];
}