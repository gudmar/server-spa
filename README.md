## Purpose
- Revise creating a server with express
- Attempt to create a js routing system and implement logging with refreshing token

## Notes:
- `browser-sync` with its `bs-config.js` file are for reloading browser on file changes. To do that you have to run `npm run ui` in another terminal


## React:

https://nnamdiadibe.hashnode.dev/server-side-rendering-ssr-with-react-and-nodejs

- User react like a template engine, install on server, make a component, serialize it with `renderToString`
- send serialized
```
app.get('*', (req, res) => {
  const html = renderToString(<App />);
  res.send(html);
});
```
