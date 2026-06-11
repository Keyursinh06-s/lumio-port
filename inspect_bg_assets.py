import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Search for all image source links in index.html (like PNG, SVG, JPG, WebP)
    # We want to identify the background mesh/gradient image or any styling assets
    img_urls = re.findall(r'https://framerusercontent\.com/images/[^\s"\')]+', html_content)
    print("Found images in index.html:")
    for url in sorted(set(img_urls)):
        print(f"  {url}")
        
    # Check if there are background-image styles in the HTML or CSS
    bg_styles = re.findall(r'background-image\s*:\s*([^;}\n]+)', html_content)
    print("\nFound background-image styles:")
    for style in set(bg_styles):
        print(f"  {style}")

if __name__ == '__main__':
    main()
