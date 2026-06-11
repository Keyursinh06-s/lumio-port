import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # Let's find all CSS rules containing "framer-styles-preset-1gpef5g"
    # They are usually in <style> tags.
    # We can match anything between { and } containing this class.
    # Let's extract style blocks and look for it.
    matches = re.finditer(r'([^{}]*framer-styles-preset-1gpef5g[^{}]*\{[^{}]*\})', content)
    print("Found CSS rules:")
    for m in matches:
        print(m.group(0).strip())
        print("-" * 50)

if __name__ == '__main__':
    main()
