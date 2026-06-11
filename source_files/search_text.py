import re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_chunks = []
        self.in_script_or_style = False

    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style']:
            self.in_script_or_style = True

    def handle_endtag(self, tag):
        if tag in ['script', 'style']:
            self.in_script_or_style = False

    def handle_data(self, data):
        if not self.in_script_or_style:
            text = data.strip()
            if len(text) > 3:
                self.text_chunks.append(text)

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    parser = TextExtractor()
    parser.feed(content)
    
    print(f"Extracted {len(parser.text_chunks)} text chunks:")
    for chunk in parser.text_chunks:
        # If the chunk has some common keywords
        if any(w in chunk.lower() for w in ['subscribe', 'hustle', 'orion', 'pricing', 'enterprise', 'standard', 'growly', 'vaultx', 'sienna', 'glidex', 'aether']):
            print(f"-> {chunk}")

if __name__ == '__main__':
    main()
