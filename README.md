# Browser homepage

Custom browser homepage, for replacing default browser home page. It should work on any modern browser, just set `index.html` as your homepage and add your own links
to the index.html (see Adding links for more informations)

I had lots of unsorted links laying around and the current bookmarks extensions
are just horrible mess, so I developed my own idea. Hopefully someone will find this project useful.

Internet exploders 6,7,8,9,10,...99 are not supported.


# Screenshots

# Adding links
Links should be added directly into `<div class="slides-container"` in index.html page. See below:

```html
<div class="slide" name="Reddit">
    <div class="part">
        <h1> Reddit </h1>

        <div class="links">
            <a href='https://www.reddit.com/r/unixporn/'> r/Unixporn </a>
            <a href='https://www.reddit.com/r/nosleep/'> r/Nosleep </a>
            <a href='https://www.reddit.com/r/homelab/'> r/HomeLab </a>
            <a href='https://www.reddit.com/r/sysadmin/'> r/SysAdmin </a>
            <a href='https://www.reddit.com/r/webdev/'> r/WebDev </a>
            <a href='https://www.reddit.com/r/devops/'> r/DevOps </a>
        </div>
    </div>
</div>

```

That's the output of above code, if I append it to my index.html

![Above code output](addingLinks_img.png)


* Div with class slide is used for the name of the button (in line below the clock)
* h1 is used for displaying the title above the link group. One slide could have many
link groups




# Tips for usage
* Click on clock to display calendar and custom countdown
* Search input supports bangs (`!command`). Supported bangs:

    | command  | arguments | search on |
    | -------- | --------- | -------   |
    | !y       | search    | youtube   |
    | !books   | search    | bookzz    |
    | !wa      | /   | wolfram alpha |
    | !ebay    | /         | ebay      |
* Notes are automatically saved when close button (X) in top right corner is pressed. You can also save them manually via `save tasks` button



# Code structure

```
├── components
│   ├── calendar.js
│   ├── clock.js
│   ├── countdown.js
│   ├── notes.js
│   ├── search-box.js
│   └── slides.js
├── css
│   ├── main_min.css
│   └── main.scss
├── index.html
├── prepros-6.config
└── README.md
```

* Components folder: contains every part/component of the browser homepage.
    * `calendar.js` -> contains code for displaying calendar when the clock is clicked
    * `clock.js` -> displays clock & date on the front page
    * `countdown.js` -> displays countdown under calendar. We can call it inside index.html or inside our own script via `countDown({'y': year, 'm': month, 'd': day}, msg)
    * `notes.js` -> contains code for managing todo tasks
    * `search-box.js` -> contains code for search input on the front page
    * `slides.js` -> code for sliding links part to left or right
* `index.html` -> your links go here, see template comment inside
* `main.scss` -> main scss file, (if you would like to change colors change them here) and compile it to main_min.css which is used by index.html


# TODO

* Calendar:
    - [ ] Add animations for month changes in calendar
    - [ ] Fast month/year selection (via dropdown) on month/year click

* Build system:
    - [ ] Use modern build system
        + concatenate all js files into one
        + auto browser reloading
        + scss compilation

# License
See License file