// .eleventy.js — Eleventy configuration
// This file tells Eleventy where things live and defines the "threads" system.

module.exports = function (eleventyConfig) {
// Copy the stylesheet straight through to the built site, untouched.
  eleventyConfig.addPassthroughCopy("src/style.css");
  // Copy the images folder straight through to the built site.
  eleventyConfig.addPassthroughCopy("src/images");

  // --- Notebook posts collection (everything in src/notebook) ---
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/notebook/*.md")
      .sort((a, b) => b.date - a.date); // newest first
  });

  // --- Threads: group posts by their `thread` front-matter value ---
  // Produces a list of threads, each with its posts, for the Notebook landing.
  eleventyConfig.addCollection("threads", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/notebook/*.md");
    const threadMap = {};

    posts.forEach((post) => {
      const t = post.data.thread;
      if (!t) return; // posts with no thread simply don't join one
      if (!threadMap[t]) {
        threadMap[t] = {
          slug: t,
          title: post.data.threadTitle || t,
          posts: [],
        };
      }
      // keep the most descriptive title we encounter for the thread
      if (post.data.threadTitle) threadMap[t].title = post.data.threadTitle;
      threadMap[t].posts.push(post);
    });

    // sort each thread's posts oldest-first (a thread reads as it developed)
    Object.values(threadMap).forEach((thread) => {
      thread.posts.sort((a, b) => a.date - b.date);
    });

    // return threads sorted by most-recently-updated
    return Object.values(threadMap).sort((a, b) => {
      const aLast = a.posts[a.posts.length - 1].date;
      const bLast = b.posts[b.posts.length - 1].date;
      return bLast - aLast;
    });
  });

  // Nice readable date filter, e.g. "20 June 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Short date for lists, e.g. "Jun 2026"
  eleventyConfig.addFilter("shortDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
