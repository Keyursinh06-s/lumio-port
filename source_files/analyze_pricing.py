import html.parser

def main():
    html_content = open('index.html', encoding='utf-8').read()
    
    start_pos = 460000
    print("Extracting from pos:", start_pos)
    snippet = html_content[start_pos:start_pos+60000]
    
    class CustomExtractor(html.parser.HTMLParser):
        def __init__(self):
            super().__init__()
            self.text_list = []
            self.in_script_style = False
            self.depth = 0
        def handle_starttag(self, tag, attrs):
            if tag in ['script', 'style']:
                self.in_script_style = True
            self.depth += 1
        def handle_endtag(self, tag):
            if tag in ['script', 'style']:
                self.in_script_style = False
            self.depth -= 1
        def handle_data(self, data):
            if not self.in_script_style:
                t = data.strip()
                if t:
                    self.text_list.append((self.depth, t))
    
    parser = CustomExtractor()
    parser.feed(snippet)
    for depth, txt in parser.text_list[:500]:
        print(f"{'  ' * depth}{txt}")
            
if __name__ == '__main__':
    main()
