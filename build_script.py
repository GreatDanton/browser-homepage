#!/usr/bin/python3
"""Python script for building index.html file. The preffered way to develop browser
homepage is to develop on homepage.html and when you are happy with the changes
execute build_script to replace your private links in homepage.html with generic
ones from generic_links.txt
"""

from build import find_tag

# 1) open homepage.html
# 2) create index.html with homepage.html but use links from generic_links

# open homepage.html and generic_links.txt

def replaceLinks():
    with open("homepage.html", 'r') as html_file, open('build/generic_links.txt', 'r') as links_file:
        homepage = html_file.read()
        links = links_file.read()

        TAG = '<div class="slides-container">'

        tags_pos = find_tag.find_correct_tags(TAG, homepage)

        if len(tags_pos) < 2:
            if tags_pos == -2:
                print('{}, does not exist').format(TAG)
            elif tags_pos == -3:
                print('{}, is mising closing html tag please fix this').format(TAG)
            elif tags_pos == -4:
                print('Html tag {} you are searching for is not supported').format(TAG)
            return


        # REPLACE PART
        start = tags_pos[0]
        end = tags_pos[1]

# open index.html and write to file (replace developer links with custom links)
        with open("index.html", 'w+') as index_file:

            final_file = homepage[:start] + TAG + "\n" + links + homepage[end+1:]
            index_file.write(final_file)
            print('Write complete')

# execute
replaceLinks()
