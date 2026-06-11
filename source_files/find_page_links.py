import re

def main():
    html_content = open('index.html', encoding='utf-8').read()
    
    # Let's search for <a href="..."> tags and print their href attributes
    # We want to see if they point to external sites, sections on the same page (e.g. #pricing), or other pages.
    hrefs = re.findall(r'<a\s+[^>]*href="([^"]+)"', html_content)
    print("Found hrefs:")
    for h in set(hrefs):
        print(f"  {h}")
        
if __name__ == '__main__':
    main()
