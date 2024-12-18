# Storage

Often the goal of multi-platform apps might be to "do it the same everywhere" and with web API's getting better all the time in the browser this isn't a foolish idea. However, when developing with a Tauri application adding in robust _local_ storage solutions has a lot more optionality. Still, if you want to have a similiar web-app alongside your native app you'll need abstraction.

## Local Storage Options

First let's start with the obvious candidates which work on the web and will work with your native applications:

- cookies
- session state
- worker cache
- IndexedDB

and although less considered there is also:

- a
- b


<Blurry />


 Since we're focused on layouts and routing we'll stop there with this component but do know that it _also_ provides the concept of [Data Loaders](https://uvr.esm.is/data-loaders/) which may be worth a look see when you have the time.
