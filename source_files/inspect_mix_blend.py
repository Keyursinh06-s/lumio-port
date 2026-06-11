import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    matches = [m.start() for m in re.finditer('mix-blend-mode', content)]
    print(f"Found 'mix-blend-mode' {len(matches)} times:")
    for m in matches:
        print(content[max(0, m - 100): m + 100])
        print("-" * 50)
        
    matches2 = [m.start() for m in re.finditer('difference', content)]
    print(f"Found 'difference' {len(matches2)} times:")
    for m in matches2[:5]:
        print(content[max(0, m - 100): m + 100])
        print("-" * 50)

if __name__ == '__main__':
    main()
