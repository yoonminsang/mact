# router

- Simple Vanilla Router
- Exist hook like react router
- Change the basic event of the anchor tag
- below is an example

```
new Router($target, [
    { path: '/', component: RootPage },
    { path: '/post', component: PostListPage },
    { path: '/post/:id', component: PostDetailPage },
    { path: '/post/:id/comments/*', component: PostCommentsPage },
    { path: '/*', component: NotFoundPage },
])
```

```
<a href='/'>Route Root Page By Router's history pushstate</a>
<a href='/' trget='_blank'>Open new tab</a>
```
