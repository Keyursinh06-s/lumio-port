import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Find all img tags that have .svg in src
    # Print the src and alt attributes
    img_matches = re.finditer(r'<img\b[^>]*src="([^"]+\.svg[^"]*)"[^>]*alt="([^"]*)"', html_content)
    print("Found SVG image tags:")
    for m in img_matches:
        print(f"  src: {m.group(1)}")
        print(f"  alt: {m.group(2)}")
        print("-" * 30)

if __name__ == '__main__':
    main()
