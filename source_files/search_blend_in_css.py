import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # Search case-insensitively for blend or mix-blend or difference or exclusion in style tags
    style_blocks = re.findall(r'<style\b[^>]*>(.*?)</style>', content, re.DOTALL)
    print(f"Searching in {len(style_blocks)} style blocks...")
    
    for i, sb in enumerate(style_blocks):
        for keyword in ['blend', 'difference', 'exclusion', 'invert']:
            matches = [m.start() for m in re.finditer(keyword, sb, re.IGNORECASE)]
            if matches:
                print(f"Style block {i} contains '{keyword}' {len(matches)} times!")
                for m in matches[:3]:
                    print(sb[max(0, m - 100): m + 100])
                    print("-" * 50)

if __name__ == '__main__':
    main()
