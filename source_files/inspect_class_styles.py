import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # Search for the class name in styles
    matches = [m.start() for m in re.finditer('framer-styles-preset-1gpef5g', content)]
    print(f"Found 'framer-styles-preset-1gpef5g' {len(matches)} times:")
    for m in matches[:3]:
        print(content[max(0, m - 100): m + 300])
        print("-" * 50)

if __name__ == '__main__':
    main()
