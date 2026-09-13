import { createBlog } from "@/app/actions/blogs";

export default function NewBlog() {
  return (
    <main>
      <h1>Create new blog</h1>

      <form action={createBlog}>
        <div>
          <label>
            Title
            <input name="title" required />
          </label>
        </div>

        <div>
          <label>
            Author
            <input name="author" required />
          </label>
        </div>

        <div>
          <label>
            URL
            <input name="url" type="url" required />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>
    </main>
  );
}
