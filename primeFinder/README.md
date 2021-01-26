# Prime Finder example

This example is for showing how heavy processes can cause performance issues for the browser. The better and best versions show how you can handle heavy processes without harming user experience.

## Running the demo

The primeFinder_Worker example won't run properly on Chrome unless the files are being served (i.e. you can't navigate to `file:///Users/.../primeFinder/primeFinder_Worker.html`, you must instead host the files with a webserver and access the files through the server). This is because Chrome's security features prevents any website (and this includes local HTML files) from accessing the filesystem, thus it won't load the worker file from the filesystem.

This can be easily done if you have python installed. From the `primeFinder` directory you can run:

`python -m SimpleHTTPServer 8000`

with python version 2 or for python version 3 you can run:

`python -m http.server 8000`

This will start a basic HTTP server on port 8000

## Differences between "naive" and "better" versions

The "naive" version simply calculates 3 primes regularly. While this acheives the task of finding primes, it ends up blocking the main thread for long periods of time which leads to lag in the page performance. The "better" versions avoid this by splitting up the work. This version instead of naively looking for 3 primes periodically, it splits up the work into small amonts of work which are run every frame. This way we never block the main thread for more than a few milliseconds. We also use `requestAnimationFrame()` to make sure that we run our JavaScript at the beginning of the frame, so that we don't interrupt the frame in progress and have the most time to run our code.

- the `calculatePrimes()` function now checks 1000 numbers each frame instead of running unitl it finds 3 primes
- `calculatePrimes()` is now called from `requestAnimationFrame()` instead of on a timer

## Differences between "better" and "worker"

The "worker" version of the code runs the `calculatePrimes()` function in a WebWorker. By running the code in the WebWorker we're running the code in a thread other than the main thread. This way work being done in the WebWorker won't block the main thread when a frame needs to be executed. We can pass information to the worker and back to the main thread using messages.

- Moved `calculatePrimes()` into a Webworker
