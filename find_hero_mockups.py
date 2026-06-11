import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # The hero mockups contain text like "Redefine Productivity", "AI cosmetology", "Solomaze"
    # Let's search for these and print the image URLs near them.
    keywords = ["Redefine Productivity", "cosmetology", "Solomaze"]
    for kw in keywords:
        idx = html_content.find(kw)
        print(f"=== Keyword: {kw} ===")
        if idx != -1:
            context = html_content[max(0, idx - 1500): idx + 1500]
            imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\')\?]+', context)
            print("Found images nearby:")
            for img in set(imgs):
                print(f"  {img}")

if __name__ == '__main__':
    main()
