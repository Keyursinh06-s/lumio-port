import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    form_matches = [m.start() for m in re.finditer(r'<form\b', content)]
    if form_matches:
        idx = form_matches[0]
        print("--- Form 0 Context ---")
        print(content[max(0, idx - 2500): idx])

if __name__ == '__main__':
    main()
