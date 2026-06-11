import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # We slice between 530000 and 560000
    sub_content = html_content[530000:560000]
    
    # Find all occurrences of image URLs
    imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\'\?<>]+', sub_content)
    print("Found images in range 530000 to 560000:")
    for img in sorted(set(imgs)):
        print(f"  {img}")

if __name__ == '__main__':
    main()
