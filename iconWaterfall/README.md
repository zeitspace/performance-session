# Icon Waterfall Example

This example is for showing how to use the performance profiler to analyze animation performance. Specifically looking at the stages of the rendering pipeline, and avaoiding extra work.

## Differences between "naive" and "better" versions

In the naive implementation we run into an issue called 'forced synchronous layout'. This is because we try to read styles form an element after we have updated its style. This means that the browser has to recaculate layout in order to give us an accurate result. The "better" version avoids this by caching values we want to read at the beginning of the function so that we can used the cached value after we update the styles. To coordinate the order of CSS reads and writes accross components or JavaScript file you could use a library like [FastDOM](https://github.com/wilsonpage/fastdom)

- Cached the positions of the icon being animated in the `pos` variable
- after updating the `top` property of the icon, we read the `pos` variable instead of the icon's `offsetHeight` property, thus avoiding a recaculation

## Differences between the "better" and the "best" versions

The "better" version has a long "paint" task that occurs on each frame. This is because each icon is on the same layer, so on every frame the browser has to paint all the icons onto a layer the size of the viewport. This is an expensive operation. The "best" version uses the `will-change` CSS attribute to let the browser know that we will be animating this element and the browser should put it into its own layer. If each icon is in it's own layer then the broswer no longer needs to paint the icons each frame, it only needs to move each icon's layer. This means it can skip the "paint" step and only needs to "composite" the icons after the layout.

This also comes with tradeoffs. Adding layers uses memory and adds management cost. Therefore this is a good solution for a known, reasonable number of elements which will animate motion or opacity. However, the work of managing the layers may cancel out the lack of paint if this method is used with lots of elements.

- Added `will-change: transform` to the `.icon` class
