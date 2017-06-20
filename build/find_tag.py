#!/usr/bin/python3
"""Script to find html tag in html text, and returns error if it
does not exist or if the closing tag is missing
"""

def find_correct_tags(search_for, text):
    # return codes:
    # -2 => search_for does not exist in text
    # -3 => missing closing tag
    # -4 => search_for is not supported tag

    if search_for in text:
        html_tags = [['<div', '</div'], ['<footer', '</footer'], ['<head', '</head'],
                    ['<ul', '</ul'], ['<ol', '</ol'], ['<link', '</link'],
                    ['<li', '</li'], ['<nav', '</nav'], ['<section', '</section'],
                    ['<article', '</article'], ['<button', '</button'],
                    ['<a', '</a'], ['<p', '</p'], ['<h', '</h']]

        starting_tag = ''
        # if tag exist in search_for
        for tag in html_tags:
            if tag[0] in search_for:
                starting_tag = tag[0]
                ending_tag = tag[1]

        # if starting_tag does not exist return
        if len(starting_tag) == 0:
            return (-4)
        # loop over text, check if there are nested tags and pick the correct ending tag
        starting_tag_pos = text.find(search_for)

        # check for nested tags
        open_tag = text.find(starting_tag, starting_tag_pos + 1)
        close_tag = text.find(ending_tag, starting_tag_pos + 1)

        # close tag is missing
        if close_tag == -1:
            return (-3)

        # if open_tag doesn't exist, return first closing tag
        elif open_tag == -1:
            ending_tag_pos = close_tag
            ending_tag_pos = text.find('>', close_tag + 1)
            return ([starting_tag_pos, ending_tag_pos])

        # if tags are not nested
        elif open_tag > close_tag:
            ending_tag_pos = close_tag
            ending_tag_pos = text.find('>', close_tag + 1)
            return ([starting_tag_pos, ending_tag_pos])

        # if tags are nested, ex:   <div>  <div></div>  </div>
        elif open_tag < close_tag:

            # loop through all open and closing tags untill open_tag > close_tag
            while True:
                # search for open, close tag position
                open_tag = text.find(starting_tag, open_tag + 1)
                close_tag = text.find(ending_tag, close_tag + 1)

                # if closing tag is missing
                if close_tag == -1:
                    ending_tag_pos = -3
                    break

                # if open tag is missing
                elif open_tag == -1:
                    ending_tag_pos = close_tag
                    ending_tag_pos = text.find('>', close_tag + 1)
                    break

                elif open_tag > close_tag:
                    ending_tag_pos = close_tag
                    ending_tag_pos = text.find('>', close_tag + 1)
                    break

            # return starting_tag and ending_tag positions
            return ([starting_tag_pos, ending_tag_pos])

    # if search_for does not exist in html text return
    else:
        return (-2)
