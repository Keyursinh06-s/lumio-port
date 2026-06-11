import html.parser
import os
import re
import sys

class ProjectTextExtractor(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_script_style = False
    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style']: self.in_script_style = True
    def handle_endtag(self, tag):
        if tag in ['script', 'style']: self.in_script_style = False
    def handle_data(self, data):
        if not self.in_script_style:
            t = data.strip()
            if t: self.text.append(t)

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    projects_dir = 'source_files/projects'
    files = [f for f in os.listdir(projects_dir) if f.endswith('.html')]
    
    for f in files:
        filepath = os.path.join(projects_dir, f)
        print(f"\n====================================\nFILE: {f}\n====================================")
        html_content = open(filepath, encoding='utf-8').read()
        
        # Get page title and description
        title_match = re.search(r'<title>(.*?)</title>', html_content)
        desc_match = re.search(r'<meta name="description" content="(.*?)"', html_content)
        print(f"Title: {title_match.group(1) if title_match else 'None'}")
        print(f"Description: {desc_match.group(1) if desc_match else 'None'}")
        
        # Extract text
        extractor = ProjectTextExtractor()
        extractor.feed(html_content)
        
        # We search for words like Client, Service, Date, Overview, or similar keywords and print around them
        # Let's print some lines of text that look like metadata
        print("Metadata & Main Text:")
        text_lines = extractor.text
        # print first 100 lines
        for i, line in enumerate(text_lines[:80]):
            print(f"  {i}: {line}")

if __name__ == '__main__':
    main()
