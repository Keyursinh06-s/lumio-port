import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # Search for the Figma variant key "o0Myn_RdW" in style blocks
    matches = [m.start() for m in re.finditer('o0Myn_RdW', content)]
    print(f"Found 'o0Myn_RdW' {len(matches)} times:")
    for m in matches[:5]:
        print(content[max(0, m - 100): m + 300])
        print("-" * 50)

if __name__ == '__main__':
    main()
