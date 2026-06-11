import html.parser
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    html_content = open('projects/growly.html', encoding='utf-8').read()
    
    class TextExtractor(html.parser.HTMLParser):
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
    extractor = TextExtractor()
    extractor.feed(html_content)
    print("Growly page text:")
    print('\n'.join(extractor.text[:150]))
    
if __name__ == '__main__':
    main()
