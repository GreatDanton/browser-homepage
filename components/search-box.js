// SEARCH BOX - contains code (logic) for search box on the front page

var ENGINE = "google"; // google or ddg
var search_box = document.getElementsByClassName('search-box')[0];
var search_parent = search_box.parentNode;


// TODO: when typing in search box, display relevant links from user saved links below
// var links = document.querySelectorAll("a");

// search box logic
search_box.onkeypress = function(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;

    // if enter key is pressed
    if (keyCode == '13') {
        // open www.google.com#q=   search_value
        var query = search_box.value;

        checkBangs(query);
        return false;
    }
};


// ** BANGS **
// shortcuts to common websites
var queries = {
    "!y": "https://www.youtube.com/results?search_query=",
    "!e": "https://www.ebay.com/",
    "!wa": "https://www.wolframalpha.com/",
    "!books": "http://bookzz.org/s/?q=",
};


var searchEngines = {
    "google": "https://www.google.com/search?&q=",
    "ddg": "https://duckduckgo.com/?q=",
};


// check if there is any bang in query ==> direct search on desired website
// else search with google
function checkBangs(query) {
    var query_arr = query.split(' ');
    var bangPart = query_arr[0];

    var search_engine = searchEngines[ENGINE];

    withoutSearch = ["!e", "!wa"]; // websites without search option

    if (queries.hasOwnProperty(bangPart)) {
        // ebay got fucked up search query, wtf ...
        if (withoutSearch.indexOf(bangPart) == -1) {
            query = createQuery(query_arr.slice(1).join(' '));
            window.location = queries[bangPart] + query;
        } else {
            window.location = queries[bangPart];
        }
    } else {
        query = createQuery(query);
        window.location = search_engine + query;
    }
}

// encoding url (so searching for c++ will actually search for c++ and not for c)
function createQuery(query) {
    return encodeURIComponent(query);
}

// when search box lose focus, remove active class
search_box.onblur = function(e) {
    search_parent.classList.remove('search-active');
};

// when search box gets focus add active class
search_box.addEventListener("focus", function(e) {
    search_parent.classList.add('search-active');
});

// add active class to x pseudo element every time search_box is focused
if (search_box == document.activeElement) {
    search_parent.classList.add('search-active');
}

// clear search box when x pseudo element is clicked
var searchClear = document.getElementsByClassName('search-clear')[0];
searchClear.addEventListener('click', function() {
    search_box.value = "";
    search_box.focus();
});