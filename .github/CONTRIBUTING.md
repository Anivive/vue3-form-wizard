# Contributing to <span style="color: red">[PACKAGE-NAME]</span>
Looking to contribute something to <span style="color: red">[PACKAGE-NAME]</span>?
**Here's how you can help**.

Please take a moment to review this document in order to make the contribution process easy
and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers
managing and developing this open source project. In return, they should reciprocate that
respect in addressing your issue or assessing patches and features.


## Using the issue tracker
The issue tracker is the preferred channel for bug reports, features requests and submitting
pull requests, but please respect the following restrictions:

Please do not use the issue tracker for personal support requests.

Please do not derail or troll issues. Keep the discussion on-topic and respect the opinions
of others.

Please do not post comments consisting solely of "+1" or "👍". Use GitHub's "reactions"
feature instead. We reserve the right to delete comments which violate this rule.


## Issues and labels
Our bug tracker utilizes several labels to help organize and identify issues. Here's what
they represent and how we use them:

* `browser bug` - Issues that are reported to us, but actually are the result of a
  browser-specific bug. These are diagnosed with reduced test cases and result in an issue
  opened on that browser's own bug tracker.

* `confirmed` - Issues that have been confirmed with a reduced test case and identify a bug
  in <span style="color: red">[PACKAGE-NAME]</span>.

* `docs` - Issues for improving or updating our documentation.

* `examples` - Issues involving the example templates included in our docs.

* `feature` - Issues asking for a new feature to be added, or an existing one to be extended
  or modified. New features require a minor version bump (e.g., v1.0.0 to v1.1.0).

* `build` - Issues with our build system, which is used to run all our tests, concatenate
  and compile source files, and more.

* `help wanted` - Issues we need or would love help from the community to resolve.

* `js` - Issues stemming from our compiled or source JavaScript files.

* `meta` - Issues with the project itself or our GitHub repository.


## Bug reports
A bug is a demonstrable problem that is caused by the code in the repository. Good bug
reports are extremely helpful, so thanks!

Guidelines for bug reports:

1. Validate your HTML to ensure your problem isn't caused by a simple error in your own code.

2. **Use the GitHub issue search** — check if the issue has already been reported.

3. **Check if the issue has been fixed** — try to reproduce it using the latest
   main in the repository.

4. **Isolate the problem** — ideally create a reduced test case, and a live example.
   [Codepen](https://codepen.io/) or [JS Bin](https://jsbin.com/?html,output) are helpful tools.

A good bug report shouldn't leave others needing to chase you up for more information.
Please try to be as detailed as possible in your report. What is your environment?
What steps will reproduce the issue? What browser(s) and OS experience the problem?
Do other browsers show the bug differently? What would you expect to be the outcome?
All these details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If suitable, include
> the steps required to reproduce the bug.
>
> This is the first step
>
> This is the second step
>
> Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being reported.
> This might include the lines of code that you have identified as causing the bug, and
> potential solutions (and your opinions on their merits).

### Reporting upstream browser bugs
Sometimes bugs reported to us are actually caused by bugs in the browser(s) themselves,
not bugs in <span style="color: red">[PACKAGE-NAME]</span> per se.

| Vendor(s) | Browser(s) |	Rendering engine |	Bug reporting website(s) | Notes |
| --- | --- | --- | --- | --- |
| Mozilla | Firefox | Gecko | https://bugzilla.mozilla.org/enter_bug.cgi | "Core" is normally the right product option to choose. |
| Apple | Safari | WebKit | https://bugs.webkit.org/enter_bug.cgi?product=WebKit | In Apple's bug reporter, choose "Safari" as the product. |
| Google, Opera | Chrome, Chromium, Opera v15+ | Blink | https://bugs.chromium.org/p/chromium/issues/list | Click the "New issue" button. |
| Microsoft | Edge | Blink | https://developer.microsoft.com/en-us/microsoft-edge/ | Go to "Help > Send Feedback" from the browser |


## Feature requests
Feature requests are welcome, but **please**, take a moment to find out whether your idea fits with
the scope and aims of the project. It's up to _you_ to make a strong case to convince the project's
developers of the merits of this feature. Please provide as much detail and context as possible.


## Pull requests
Good pull requests (patches, improvements, new features) are a fantastic help. They should
remain focused in scope and avoid containing unrelated commits.

Please ask first before embarking on any significant pull request (e.g. implementing
features, refactoring code, porting to a different language), otherwise you risk spending
a lot of time working on something that the project's developers might not want to merge
into the project. For trivial things, or things that don't require a lot of your time,
you can go ahead and make a PR.

Please adhere to the coding guidelines used throughout the project (indentation, accurate
comments, etc.) and any other requirements (such as test coverage).

Do not commit any dist files (dist/ or js/dist). Those files are automatically generated by
our build tools.

When contributing to <span style="color: red">[PACKAGE-NAME]</span>'s documentation, you should
edit the documentation source files in the `/docs` directory of the main branch.

Adhering to the following process is the best way to get your work included in the project:

1. Fork the project, clone your fork, and configure the remotes:
```
    # Clone your fork of the repo into the current directory
    git clone <git-clone-link>
    # Navigate to the newly cloned directory
    cd <repo-name>
    # Assign the original repo to a remote called "upstream"
    git remote add upstream <git-clone-link>
```

2. If you cloned a while ago, get the latest changes from upstream:
```
    git checkout master
    git pull upstream master
```

3. Create a new topic branch (off the main project development branch) to contain your feature,
   change, or fix:
```
    git checkout -b <topic-branch-name>
```

4. Commit your changes in logical chunks. Please adhere to these git commit message
   guidelines, or your code is unlikely be merged into the main project. Use Git's
   interactive rebase feature to tidy up your commits before making them public.


5. Locally merge (or rebase) the upstream development branch into your topic branch:
```
    git pull [--rebase] upstream master
```

6. Push your topic branch up to your fork:
```
    git push origin <topic-branch-name>
```

7. Open a Pull Request with a clear title and description against the main branch.

IMPORTANT: By submitting a patch, you agree to allow the project owners to license your
work under the terms of the [MIT License](LICENSE.md) (if it includes code changes) and under
the terms of the [Creative Commons Attribution 3.0 Unported License](https://creativecommons.org/licenses/by/3.0/)
(if it includes documentation changes).


## Code guidelines

### Golden Rule
>_Every line of code should appear to be written by a single person, no matter the number of
> contributors._

### HTML
Adhere to the [Code Guide](https://codeguide.co/#html).

### CSS
Adhere to the [Code Guide](https://codeguide.co/#css).


### JS
Adhere to the [Airbnb Style Guide](https://github.com/airbnb/javascript).

* ES6
* 4 spaces
* "Attractive"

## License
By contributing your code, you agree to license your contribution under the
[MIT License](LICENSE.md).

By contributing to the documentation, you agree to license your contribution under the
[Creative Commons Attribution 3.0 Unported License](https://creativecommons.org/licenses/by/3.0/).
