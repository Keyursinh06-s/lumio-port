import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    sub_content = html_content[530000:560000]
    
    # Let's find all <svg ...>...</svg> blocks
    svg_matches = re.finditer(r'<svg\b[^>]*>(.*?)</svg>', sub_content, re.DOTALL)
    print("Found inline SVGs in range 530000 to 560000:")
    for i, m in enumerate(svg_matches):
        print(f"SVG {i} (length {len(m.group(0))}):")
        # Print first 200 chars and some structural tags
        print(m.group(0)[:300])
        print("-" * 30)

if __name__ == '__main__':
    main()
