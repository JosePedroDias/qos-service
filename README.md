# What it stores

stores GET requests:

* {String} `p` path
* {Object} `q` query arguments - notice that booleans and number are properly casted.
* {Number} `t` unix timestamp
* {String} `ua` user agent


# How to fire

you should invoke KPIs with

```javascript
var img = new Image();
img.src = 'http://127.0.0.1:3333/timed/sapoVideosMetadata?u=http%3A%2F%2Frd3.videos.sapo.pt%2F6Oaz0EAwHAWkymAzvzZE%2Fmov%2F1&t=223&v=v150901';
```


# How to query

paths starting with underscore are special options.  
in this case instead of an image, JSON is returned.

to match properties of the query string, prefix the property name with a dot.


## Supported operations:

### list

`/_list?<optional filters>`

returns the list of entries passing the filter


### count

`/_count?<optional filters>`

returns the number of entries passing the filter


### extract/<propName>

`/_extract/<prop name>?<optional filters>`

returns the value of the given prop for the entries passing the filter


## Example KPIs

```
http://127.0.0.1:3333/timed/sapoVideosMetadata?u=http%3A%2F%2Frd3.videos.sapo.pt%2F6Oaz0EAwHAWkymAzvzZE%2Fmov%2F1&t=223&v=v150901
http://127.0.0.1:3333/timed/sapoVideosMetadata?u=http%3A%2F%2Frd3.videos.sapo.pt%2F6Oaz0EAwHAWkymAzvzZE%2Fmov%2F1&t=523&v=v150901
http://127.0.0.1:3333/timed/sapoVideosMetadata?u=http%3A%2F%2Frd3.videos.sapo.pt%2F6Oaz0EAwHAWkymAzvzZE%2Fmov%2F1&t=123&v=v150901

http://127.0.0.1:3333/error/sapoVideosMetadata?u=http%3A%2F%2Frd3.videos.sapo.pt%2F6Oaz0EAwHAWkymAzvzZE%2Fmov%2F1&v=v150901
http://127.0.0.1:3333/error/sapoVideosMetadata?u=http%3A%2F%2Frd3.videos.sapo.pt%2F6Oaz0EAwHAWkymAzvzZE%2Fmov%2F1&v=v150901
```

## Example queries

```
http://127.0.0.1:3333/_list?p=/timed/sapoVideosMetadata

http://127.0.0.1:3333/_count?p=/timed/sapoVideosMetadata
http://127.0.0.1:3333/_count?p=/timed/sapoVideosMetadata

http://127.0.0.1:3333/_extract/t?p=/timed/sapoVideosMetadata
http://127.0.0.1:3333/_extract/u?p=/timed/sapoVideosMetadata
```
