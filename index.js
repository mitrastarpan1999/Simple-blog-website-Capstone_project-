import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogPosts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: "Create your blog seamlessly.",
        posts: blogPosts
    });

});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { posts: blogPosts });
});

app.get("/create-blog", (req, res) => {
    res.render("create-blog.ejs");
});


app.get("/edit-blog/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    const blog = blogPosts[blogId];
    
    
    if (blog) {
        res.render("edit-blogs.ejs", { blog, blogId });
    } else {
        res.redirect("/blogs");
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
  });
  

app.post("/submit", (req, res) => {
    const blog = {
        title: req.body["title"],
        content: req.body["content"],
        date: new Date().toLocaleString()
    };

   
    blogPosts.push(blog);

   
    res.redirect("/blogs");
});
app.post("/update-blog/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    const { title, content } = req.body;

    if (title && content) {
        blogPosts[blogId] = { title, content, date: new Date().toLocaleString() };
    }

    res.redirect("/blogs");
});

app.post("/delete-blog/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    blogPosts.splice(blogId, 1);
    res.redirect("/blogs");
});


app.listen(port,()=> {
    console.log(`Server is running on port: ${port}`);
    console.log(`http://localhost:${port}`);
    
    
    
});