# My Blog Example

This example is for demonstrating how to use the Lighthouse audit tool. The Lighthouse audit tool provides a score for page load performance, and provides a list of suggestions for improving site performance and user experience.

## Running the demo

This example won't run properly on Chrome unless the files are being served (i.e. you can't navigate to `file:///Users/.../myBlog/myBlog.html`, you must instead host the files with a webserver and access the files through the server). This is because Chrome's security features prevents any website (and this includes local HTML files) from accessing the filesystem, thus it won't load the worker file from the filesystem.

This can be easily done if you have python installed. From the `myBlog` directory you can run:

`python -m SimpleHTTPServer 8000`

with python version 2 or for python version 3 you can run:

`python -m http.server 8000`

This will start a basic HTTP server on port 8000

## Differences between the normal and better versions

- The better verison uses better compressed JPEG images rather than PNG images. These images are smaller so they can be transferred faster
  - You could also use even more efficient image sizes by using a format like JPEG 2000 or WEBP, however, thesearen't fully supported by all browsers yet.
  - If you want to offer new format (like WEBP) images with a fallback format for users you can [using a `<picture>` element](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#use_modern_image_formats_boldly)
- The better version uses differenct image sizes so the browser requests an image of the appropriate size for the device
  - This is done using the `srcset` and `size` attributes on an `<img>` element
- The better version removes the unused jQuery and lodash libraries
  - JavaScript can take up a lot of space especially libraries with lots of fuctionality. We should avoid importing any libraries we don't.
  - When using only a few parts of a library we should consider writing our own version to avoid the large import, or if possible only import the parts we need (like lodash supports)
