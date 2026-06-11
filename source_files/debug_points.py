import html.parser
import sys

class ProjectParser(html.parser.HTMLParser):
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

def debug_file(filename):
    sys.stdout.reconfigure(encoding='utf-8')
    filepath = f"source_files/projects/{filename}"
    content = open(filepath, encoding='utf-8').read()
    
    parser = ProjectParser()
    parser.feed(content)
    text_lines = parser.text
    
    print(f"\n===== DEBUG {filename} =====")
    for i, line in enumerate(text_lines):
        if "why" in line.lower() or "features" in line.lower():
            # print 15 lines before and after
            print(f"Match found at index {i}: '{line}'")
            for j in range(max(0, i-5), min(len(text_lines), i+15)):
                print(f"  {j}: {text_lines[j]}")
            print("-----------------------")

def main():
    debug_file("growly.html")
    debug_file("glidex.html")
    debug_file("aether-studio.html")

if __name__ == '__main__':
    main()
