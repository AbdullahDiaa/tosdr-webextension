# Firefox add-on for [Terms of Service; Didn't Read][tosdr]

“I have read and agree to the Terms” is the biggest lie on the web.
We aim to fix that. “Terms of Service; Didn't Read” is a user
rights initiative to rate and label website terms & privacy
policies, from very good (class A) to very bad (class E).

This extension informs you instantly of your rights online by
showing an unintrusive icon in the toolbar. You can click on this
icon to get summaries from the [Terms of Service; Didn't
Read][tosdr] initiative.

This extension has been written using [WebExtensions][webextensions]  API.

-----------

# Debugging
## Prerequisites

- [Firefox Nightly][nightly] is recommended, [WebExtensions API][branch_dates] will be available in Firefox and Addons marketplace starting from **Firefox 44** and the first stable release in **Firefox 48**.
- Allow installing unsigned add-ons by flipping this prefrence `xpinstall.signatures.required` in `about:config`.
- [gulpjs][gulp] is required to autmoate addon installation for testing.


## Building and Installation instructions

#### 1. Make sure **gulpjs** is installed:

```sh
npm install --global gulp
```

#### 2. clone the repo and install devDependencies:

```sh
git clone ...
cd ..
npm install
```

#### 3. Run gulp, the default task will watch addon files and automatically package XPI file:

```sh
gulp
```
Using the falg `--app` will the run the addon in the browser with every file change:

```sh
gulp --app "FirefoxNightly"
```

-----------

# License

AGPL-3.0+ (GNU Affero General Public License, version 3 or later)

See <https://tosdr.org/legal.html> for more details on the legal aspects of the project.

[tosdr]: https://tosdr.org
[webextensions]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions
[nightly]: https://nightly.mozilla.org/
[branch_dates]: https://wiki.mozilla.org/RapidRelease/Calendar#Future_branch_dates
[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md